import { db } from "../../../src/database/driver";
import { Product } from "../../models/product";

export async function getProducts() {
    const result = await db.select("*").from(Product);
    //return {
}
