import {UserinfoModel} from "./userinfo.model";
import {FactoryModelDTO} from "./factory.model";
import {CartModelDTO} from "./cart.model";
import {OrderModelDTO} from "./order.model";
import {ImageDTO} from "./image.model";

export interface UserModelDTO{
    id : number;
    username : string;
    password : string;
    usertype : string;
    userInfoDTO : UserinfoModel;
    factoryDTO : FactoryModelDTO | null;
    cart:CartModelDTO | null;
    orders:OrderModelDTO[] | null;
    image : ImageDTO
}