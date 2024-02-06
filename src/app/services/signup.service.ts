import {booleanAttribute, Injectable} from "@angular/core";
import {
    checkModelRequest,
    LoginModelRequest,
    LoginModelResponse,
    SignupModelRequest,
    SignupModelResponse
} from "../models";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UpdateModelRequest, UpdateModelResponse} from "../models/update.model";

@Injectable({
    providedIn:"root"
})
export class SignupService{
    baseUrl= environment.apiUrl;
    constructor(private http: HttpClient, private router: Router) {


    }

    signup(payload: SignupModelRequest): Observable<SignupModelResponse> {
        return this.http.post<SignupModelResponse>(this.baseUrl+'user/register', payload);
    }
    checkEmail(email: string, id?: number): Observable<boolean> {
        if (!id) id=-1;
        let payload : checkModelRequest = {
            str:email,
            id:id
        }
        return this.http.post<boolean>(this.baseUrl+'user/checkemail', payload);
    }
    checkFactoryName(name: string, id?: number): Observable<boolean> {
        if (!id) id=-1;
        let payload : checkModelRequest = {
            str:name,
            id:id
        }
        return this.http.post<boolean>(this.baseUrl+'user/checkfactoryname', payload);
    }
    update(payload: UpdateModelRequest): Observable<UpdateModelResponse> {
        return this.http.post<UpdateModelResponse>(this.baseUrl+'user/update', payload);
    }

}