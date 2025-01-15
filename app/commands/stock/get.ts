import { inArray } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import type { CommandResult } from "../../../src/types/command";
import { Product } from "../../models/product";
import { productIdValidator } from "../../../src/utils/validator";
import { respondWithGenericCommandError } from "../../../src/utils/error";

export async function getProductsStock(
    ids: number[],
): Promise<CommandResult<Record<number, number>>> {
    try {
        const productIdsParseResult = productIdValidator.array().safeParse(ids);
        if (!productIdsParseResult.success) {
            return { success: false, error: productIdsParseResult.error };
        }
        const res = await db
            .select({ id: Product.id, stock: Product.stock })
            .from(Product)
            .where(inArray(Product.id, productIdsParseResult.data));

        if (!res.length) {
            return { success: false, error: new Error("Products not found") };
        }

        const result: Record<number, number> = {};

        for (const item of res) {
            result[item.id] = item.stock;
        }

        return { success: true, data: result };
    } catch (error) {
        return respondWithGenericCommandError(error);
    }
}

export async function getProductStock(
    id: number,
): Promise<CommandResult<number>> {
    const res = await getProductsStock([id]);
    if (res.success) {
        return { success: true, data: res.data[id] };
    }
    return res;
}
