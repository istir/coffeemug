import { and, type AnyColumn, eq, gt, inArray, sql } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import { Product, type ProductSelect } from "../../models/product";
import type { CommandResult } from "../../../src/types/command";
import {
    productIdValidator,
    newStockValidator,
} from "../../../src/utils/validator";
import { isDrizzleError } from "../../../src/database/utils";
import { respondWithGenericCommandError } from "../../../src/utils/error";
const increment = (column: AnyColumn, value = 1) => {
    return sql`${column} + ${value}`;
};

export async function restockProduct(
    id: number,
    quantity: number,
): Promise<CommandResult<ProductSelect>> {
    try {
        const parsedPid = productIdValidator.safeParse(id);
        if (!parsedPid.success) {
            return { success: false, error: parsedPid.error };
        }
        const parsedQuantity = newStockValidator.safeParse(quantity);
        if (!parsedQuantity.success) {
            return { success: false, error: parsedQuantity.error };
        }

        const result = await db
            .update(Product)
            .set({ stock: increment(Product.stock, quantity) })
            .where(eq(Product.id, parsedPid.data))
            .returning();
        return { success: true, data: result[0] };
    } catch (error) {
        return respondWithGenericCommandError(error);
    }
}

export async function sellProducts(
    ids: number[],
    tx = db,
): Promise<CommandResult<ProductSelect[]>> {
    try {
        const parsedPid = productIdValidator.array().safeParse(ids);
        if (!parsedPid.success) {
            return { success: false, error: parsedPid.error };
        }
        return new Promise((resolve) => {
            tx.transaction(async (trx) => {
                const results = await trx
                    .update(Product)
                    .set({ stock: increment(Product.stock, -1) })
                    .where(
                        and(
                            inArray(Product.id, parsedPid.data),
                            gt(Product.stock, 0),
                        ),
                    )
                    .returning();

                if (!results.length) {
                    return resolve({
                        success: false,
                        error: new Error("Valid product not found"),
                    });
                }

                const parsedQuantity = newStockValidator
                    .array()
                    .safeParse(results.map((r) => r.stock));

                if (!parsedQuantity.success) {
                    trx.rollback();
                    return resolve({
                        success: false,
                        error: parsedQuantity.error,
                    });
                }
                return resolve({ success: true, data: results });
            }).catch((error) => {
                if (isDrizzleError(error)) {
                    if (error.message === "Rollback") {
                        return resolve({
                            success: false,
                            error: new Error("Quantity is too low"),
                        });
                    } else {
                        return resolve({ success: false, error });
                    }
                }
            });
        });
    } catch (error) {
        return respondWithGenericCommandError(error);
    }
}

export async function sellProduct(
    id: number,
): Promise<CommandResult<ProductSelect>> {
    const result = await sellProducts([id]);
    if (!result.success) return result;
    if (!result.data.length) {
        return { success: false, error: new Error("Failed to sell product") };
    }
    return { success: true, data: result.data[0] };
}
