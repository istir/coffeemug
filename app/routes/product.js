// @ts-check
import express from "express";
import { createProduct } from "../commands/product/create.js";
import { getErrorMessage } from "../../src/utils/error.js";
const router = express.Router();

router.post("/", async (req, res) => {
    const result = await createProduct(req.body);
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(201).json(result.data);
});

export { router as productRouter };
