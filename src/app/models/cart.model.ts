import {ProductModelRequest} from "./product.model";

export interface CartModelDTO{
    id:number;
    products : ProductModelRequest[];
}