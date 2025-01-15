import { z } from "zod";

export const newStockValidator = z.number().int().nonnegative();
export const productIdValidator = z.number().int().positive();
export const createOrderValidator = z.object({
    ids: z.number().int().positive().array(),
});
