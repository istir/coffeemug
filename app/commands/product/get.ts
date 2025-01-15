import { inArray } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import { CommandResult } from "../../../src/types/command";
import { ProductSelect } from "../../../src/types/products";
import { productIdValidator } from "../../../src/utils/validator";
import { Product } from "../../models/product";

export async function getProducts(
    ids: number[] | undefined = undefined,
): Promise<CommandResult<ProductSelect[]>> {
    try {
        if (ids) {
            const parsedProductIds = productIdValidator.array().safeParse(ids);
            if (!parsedProductIds.success) {
                return { success: false, error: parsedProductIds.error };
            }

            const result = await db
                .select()
                .from(Product)
                .where(inArray(Product.id, parsedProductIds.data));

            return { success: true, data: result };
        }
        const result = await db.select().from(Product);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error };
    }
}
