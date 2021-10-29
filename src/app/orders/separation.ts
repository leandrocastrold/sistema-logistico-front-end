import { Order } from "./order";

export interface Separation {
    id?:number,
    orderItems:Order[],
    totalPrice:number,
    status:string
}
