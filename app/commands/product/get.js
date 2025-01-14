import { db } from "../../../src/database/driver.js";
import { Product } from "../../models/product.js";

/** @returns {Promise<CommandResult<ProductSelect[]>} */
export async function getProducts() {
    const result = await db.select("*").from(Product);
    //return {
}
