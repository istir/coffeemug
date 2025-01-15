import { z } from "zod";
import { ordersTable, productsToOrderTable } from "../../src/database/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const orderSelectSchema = createSelectSchema(ordersTable);
export const orderInsertSchema = createInsertSchema(ordersTable);

const orderSchema = orderSelectSchema.extend({
    price: z.number().positive(),
    price_paid: z.number().nonnegative(),
});

export const Order = {
    table: ordersTable,
    schema: orderSchema,
    productsToOrderTable,
};

export type OrderSelect = z.infer<typeof orderSelectSchema>;
export type OrderInsert = z.infer<typeof orderInsertSchema>;
