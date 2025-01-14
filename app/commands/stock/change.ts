import { and, AnyColumn, DrizzleError, eq, gt, sql } from "drizzle-orm";
import { db } from "../../../src/database/driver";
import { Product } from "../../models/product";
import { CommandResult } from "../../../src/types/command";
import { ProductSelect } from "../../../src/types/products";
import { z } from "zod";
import { isDrizzleError } from "../../../src/utils/error";
const increment = (column: AnyColumn, value = 1) => {
    return sql`${column} + ${value}`;
};
const newStockValidator = z.number().int().nonnegative();
const productIdValidator = z.number().int().positive();

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
        return {
            success: false,
            error: error,
        };
    }
}

export async function sellProduct(
    id: number,
): Promise<CommandResult<ProductSelect>> {
    try {
        const parsedPid = productIdValidator.safeParse(id);
        if (!parsedPid.success) {
            return { success: false, error: parsedPid.error };
        }
        return new Promise((resolve) => {
            db.transaction(async (tx) => {
                const result = await tx
                    .update(Product)
                    .set({ stock: increment(Product.stock, -1) })
                    .where(
                        and(
                            eq(Product.id, parsedPid.data),
                            gt(Product.stock, 0),
                        ),
                    )
                    .returning();

                if (!result.length) {
                    return resolve({
                        success: false,
                        error: new Error("Valid product not found"),
                    });
                }
                const product = result[0];

                const parsedQuantity = newStockValidator.safeParse(
                    product.stock,
                );
                if (!parsedQuantity.success) {
                    tx.rollback();
                    return resolve({
                        success: false,
                        error: parsedQuantity.error,
                    });
                }
                return resolve({ success: true, data: product });
            }).catch((error) => {
                if (isDrizzleError(error)) {
                    if (error.message === "Rollback") {
                        return resolve({
                            success: false,
                            error: new Error("Quantity is too low"),
                        });
                    }
                }
            });
        });
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
}
