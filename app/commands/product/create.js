import { db } from "../../../src/database/driver.js";
import { Product, productInsertSchema } from "../../models/product.js";

/**
 * @param {ProductInsert} data
 * @returns {Promise<CommandResult<ProductSelect,Error>>}
 */
export async function createProduct(data) {
    try {
        const parsedResult = productInsertSchema.safeParse(data);
        if (!parsedResult.success) {
            return { success: false, error: parsedResult.error };
        }

        const result = await db
            .insert(Product)
            .values({
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
            })
            .returning();
        if (!result.length) {
            throw new Error("Failed to insert product");
        }
        return { success: true, data: result[0] };
    } catch (error) {
        return { success: false, error: error };
    }
}
