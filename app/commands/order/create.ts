import { createTransaction } from "../../../src/database/utils";
import type { CommandResult } from "../../../src/types/command";
import { removeDuplicates } from "../../../src/utils/array";
import { areAllProductsInStock } from "../../../src/utils/stock";
import { Order, type OrderSelect } from "../../models/order";
import { getProducts } from "../product/get";
import { sellProducts } from "../stock/change";

export async function createOrder(
    productIds: number[],
): Promise<CommandResult<OrderSelect>> {
    const customerId = 1; // in future, get it from an authorizer

    const products = await getProducts(productIds);
    if (!products.success) return products;

    if (
        removeDuplicates(productIds).length != products.data.length ||
        !areAllProductsInStock(products.data)
    ) {
        return {
            success: false,
            error: new Error("Some products are unavailable"),
        };
    }
    const price = products.data.reduce(
        (prev, current) => prev + current.price,
        0,
    );

    return new Promise((resolve) => {
        createTransaction(async (tx) => {
            const soldProductResult = await sellProducts(
                products.data.map((product) => product.id),
                tx,
            );
            if (!soldProductResult.success) {
                return resolve({
                    success: false,
                    error: soldProductResult.error,
                });
            }
            const orderData = await tx
                .insert(Order.table)
                .values({
                    customer_id: customerId,
                    created_at: new Date(),
                    price,
                    price_paid: 0,
                })
                .returning();

            if (!orderData.length || !orderData[0].id) {
                return resolve({
                    success: false,
                    error: new Error("Failed to create order"),
                });
            }

            await tx.insert(Order.productsToOrderTable).values(
                products.data.map((product) => ({
                    order_id: orderData[0].id,
                    product_id: product.id,
                })),
            );

            return resolve({ success: true, data: orderData[0] });
        }).catch((error) => {
            return resolve({
                success: false,
                error: error,
            });
        });
    });
}
