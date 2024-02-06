import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {LoginModelRequest, LoginModelResponse} from "../models";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserService {

    baseUrl= environment.apiUrl;
    constructor(private http: HttpClient, private router: Router) {

    }
    getAllProducts(): Observable<any> {
        //console.log("payload: " + payload.username + " " + payload.password);
        return this.http.get<any>(this.baseUrl+'product/getall');
    }

    /*readUser(id:number):Observable<any> {
        //console.log("payload: " + payload.username + " " + payload.password);
        return this.http.get<any>(this.baseUrl+'user/read');
    }*/


}