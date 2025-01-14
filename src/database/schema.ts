import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text().notNull().default(""),
    price: real().notNull(),
    stock: int().default(0).notNull(),
});
