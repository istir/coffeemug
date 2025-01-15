import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text().notNull().default(""),
    price: real().notNull(),
    stock: int().default(0).notNull(),
    created_at: int({ mode: "timestamp_ms" }),
});

export const ordersTable = sqliteTable("orders", {
    id: int().primaryKey({ autoIncrement: true }),
    customer_id: int().notNull(),
    price: real().notNull(),
    price_paid: real().default(0),
    created_at: int({ mode: "timestamp_ms" }),
});

export const productsToOrderTable = sqliteTable(
    "products_orders",
    {
        order_id: int().references(() => ordersTable.id),
        product_id: int().references(() => productsTable.id),
    },
    (table) => [unique().on(table.order_id, table.product_id)],
);
