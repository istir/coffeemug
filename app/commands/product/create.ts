import { db } from "../../../src/database/driver";
import { CommandResult } from "../../../src/types/command";
import { ProductInsert, ProductSelect } from "../../../src/types/products";
import { Product, productInsertSchema } from "../../models/product";

export async function createProduct(
    data: ProductInsert,
): Promise<CommandResult<ProductSelect, Error>> {
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
