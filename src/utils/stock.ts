import { ProductSelect } from "../types/products";

export function areAllProductsInStock(products: ProductSelect[]): boolean {
    return products.every((product) => product.stock > 0);
}
