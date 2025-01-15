import { eq, inArray } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import { CommandResult } from "../../../src/types/command";
import { Product } from "../../models/product";
import { productIdValidator } from "../../../src/utils/validator";

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
        return { success: false, error };
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

//export async function getAvailableProductsStock(
//    ids: number[],
//): Promise<CommandResult<Record<number, number>>> {
//    {
//        const res = await getProductsStock(ids);
//        if (!res.success) return res;
//        const products = Object.entries(res.data);
//        if (
//            !products.every(
//                ([key, value]) =>
//                    ids.includes(Number.parseInt(key)) && value > 0,
//            )
//        ) {
//            return {
//                success: false,
//                error: new Error("One or more products are unavailable"),
//            };
//        }
//        return res;
//    }
//}
