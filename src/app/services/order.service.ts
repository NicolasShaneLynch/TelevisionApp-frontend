import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {OrderModelRequest, OrderModelResponse} from "../models/order.model";

@Injectable({
    providedIn: "root"
})
export class OrderService{

    baseUrl= environment.apiUrl;
    constructor(private http: HttpClient, private router: Router) {

    }

    insertOrder(id:number, payload : OrderModelRequest): Observable<OrderModelResponse> {

        //console.log("payload: " + payload.username + " " + payload.password);
        //lo so, non andrebbe fatto cosi', andrebbe fatto un DTO adhoc per ogni richiesta, ma lo sprint
        //scade a breve e c'è ancora troppa roba da fare :(
        //la logica comunque risulta chiara, andrebbero fatti una infinita di DTO sia lato front-end
        //che lato backend
        return this.http.post<OrderModelResponse>(this.baseUrl+'order/insert?user_id='+id, payload);
    }

    readOrder(payload : number): Observable<any> {
        //console.log("payload: " + payload.username + " " + payload.password);
        return this.http.get<any>(this.baseUrl+'order/read?id=' + payload);
    }
    getOrdersByUserId(id:number):Observable<any>{
        return this.http.get<any>(this.baseUrl+'order/getAllByID?user_id=' + id);
    }

}