import { ProductSelect } from "../../app/models/product";

export function areAllProductsInStock(products: ProductSelect[]): boolean {
    return products.every((product) => product.stock > 0);
}
