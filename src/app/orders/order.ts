import { Product } from "../products/product";
import { Separation } from "./separation";

export interface Order {
    id?: number,
    product: Product,
    orderModel?: Separation,
    quantity: number,
    totalPrice:number
}
