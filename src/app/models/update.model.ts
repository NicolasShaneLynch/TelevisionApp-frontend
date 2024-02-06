import {ImageDTO} from "./image.model";

export interface UpdateModelRequest{
    id: number;
    email : string;
    usertype : string;
    password : string;
    userinfo_id: number;
    lastname : string;
    firstname : string;
    birthday : string;
    genre : string;
    nation : string;
    province : string;
    city : string;
    address : string;
    factory_id: number;
    factory_name : string;
    factory_description : string;
    factory_province : string;
    factory_city : string;
    factory_address : string;
    cart_id: number;
    image : ImageDTO;
}

export interface UpdateModelResponse{
    result:string;
    message:string;
    code:number;
}
