import express from "express";
import { createOrder } from "../commands/order/create";
import { getErrorMessage } from "../../src/utils/error";
import { createOrderValidator } from "../../src/utils/validator";

const router = express.Router();

router.post("/", async (req, res) => {
    const parsedCreateOrderData = createOrderValidator.safeParse(req.body);
    if (!parsedCreateOrderData.success) {
        if (!parsedCreateOrderData.success) {
            return res
                .status(400)
                .json({ error: getErrorMessage(parsedCreateOrderData.error) });
        }
    }
    const result = await createOrder(parsedCreateOrderData.data.ids);
    if (!result.success) {
        return res.status(400).json({ error: getErrorMessage(result.error) });
    }
    return res.status(201).json({ data: result.data });
});

export { router as orderRouter };
