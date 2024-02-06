import {ImageDTO} from "./image.model";

export interface SignupModelRequest{
    email : string;
    usertype : string;
    password : string;
    lastname : string;
    firstname : string;
    birthday : string;
    genre : string;
    nation : string;
    province : string;
    city : string;
    address : string;
    factory_name : string;
    factory_description : string;
    factory_province : string;
    factory_city : string;
    factory_address : string;
}

export interface SignupModelResponse{
    result:string;
    message:string;
    code:number;
}

export interface checkModelRequest{
    str:string;
    id:number|null;
}
