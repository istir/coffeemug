import { db } from "../../../src/database/driver";
import { CommandResult } from "../../../src/types/command";
import { ProductSelect } from "../../../src/types/products";
import { Product } from "../../models/product";

export async function getProducts(): Promise<CommandResult<ProductSelect[]>> {
    const result = await db.select().from(Product);
    return { success: true, data: result };
}
