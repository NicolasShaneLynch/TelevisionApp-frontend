import {ProductModelRequest} from "./product.model";

/*export interface OrderDTO{
    id:number;
    products : ProductModelRequest[];
}

export interface OrderModelRequest{
    user_id:number;
    orderDTO : OrderDTO;

    //products_id : number[];
}*/

export interface OrderModelRequest{
    id:number;
    products : ProductModelRequest[];
    //products_id : number[];
}

export interface OrderModelResponse{
    id:number;
    products : ProductModelRequest[];
}

export interface OrderModelDTO{
    id:number;
    user_id : number;
    date:string;
    products : ProductModelRequest[];

}