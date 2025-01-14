// @ts-check
import express from "express";
import { createProduct } from "../commands/product/create";
import { getErrorMessage } from "../../src/utils/error";
import { getProducts } from "../commands/product/get";
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
export { router as productRouter };
