import { inArray } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import { productIdValidator } from "../../../src/utils/validator";
import { Product, type ProductSelect } from "../../models/product";
import type { CommandResult } from "../../../src/types/command";
import { respondWithGenericCommandError } from "../../../src/utils/error";

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
        return respondWithGenericCommandError(error);
    }
}
