import {ImageDTO} from "./image.model";
import {TagModel} from "./tag.model";

export interface ProductModelRequest {
    id : number;
    id_factory : number;
    description : string;
    name: string;
    price: string;
    type: string;
    tags: TagModel[];
    images : ImageDTO[];
}


export interface ProductModelResponse {
    id : number;
    description : string;
    id_factory : number;
    name: string;
    price: number;
    type: string;
    tags: TagModel[];
    images : ImageDTO[];
}
