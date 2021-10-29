import { Product } from "../products/product";

export interface ProdPosition {
    id?:number,
    product: Product,
    availableQuantity:number,
    reserveQuantity:number
}
