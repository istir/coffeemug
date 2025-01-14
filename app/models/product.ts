import { z } from "zod";
import { productsTable } from "../../src/database/schema";

export const Product = productsTable;
const maxLength = 50;

export const productSchema = z.object({
    id: z.number().int().readonly(),
    name: z.string().max(maxLength),
    description: z.string().max(maxLength),
    price: z.number().min(0),
    stock: z.number().int().min(0),
});

export const productSelectSchema = productSchema;

export const productInsertSchema = productSchema.extend({
    id: z.never().optional(),
});
