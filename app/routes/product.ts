// @ts-check
import express from "express";
import { createProduct } from "../commands/product/create";
import { getErrorMessage } from "../../src/utils/error";
import { getProducts } from "../commands/product/get";
import { restockProduct, sellProduct } from "../commands/stock/change";
import { z } from "zod";
const router = express.Router();

router.post("/", async (req, res) => {
    const result = await createProduct(req.body);
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(201).json({ data: result.data });
});

router.get("/", async (_req, res) => {
    const result = await getProducts();
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(200).json({ data: result.data });
});

router.post("/:id/restock", async (req, res) => {
    const query = req.query as unknown as { qty?: string };
    let restockQuantity = Number.parseInt(query.qty || "1");
    if (Number.isNaN(restockQuantity) || !restockQuantity) {
        restockQuantity = 1;
    }
    const result = await restockProduct(
        Number.parseInt(req.params.id),
        restockQuantity,
    );
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(200).json({ data: result.data });
});

router.post("/:id/sell", async (req, res) => {
    const result = await sellProduct(Number.parseInt(req.params.id));
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(200).json({ data: result.data });
});

export { router as productRouter };
