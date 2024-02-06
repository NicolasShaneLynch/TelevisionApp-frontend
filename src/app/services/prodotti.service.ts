import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ProductModelRequest, ProductModelResponse} from "../models/product.model";


@Injectable({providedIn: 'root'})
export class ProdottiService{

    baseUrl : string = environment.apiUrl;

    httpOptions = {
        headers : new Headers(
            {"Content-Type" : "application/json"}
        )

    }
    constructor(private http: HttpClient ) {}

    resolveListaProdotti(): Observable<any> | undefined {
        return this.getListaProdotti(25, 0).pipe(
            catchError((error) => {
                return of('NO DATA FOUND')
            })
        )
    }
    getListaProdotti(
        pageSize: number,
        pageNumber: number,
        ...args: any
    ) : Observable<any>{
        let url =`${this.baseUrl}product/getall?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        args.forEach((x:any) => {
           if(x){
               for (const [key,value] of Object.entries(x)){
                   url = url + `&${key}=${value}`;
               }
           }
        });
        return this.http.get<any>(url);
    }

    deleteProdotto(id: number) : Observable<any>{
        let url =`${this.baseUrl}product/delete/?id=${id}`;
        console.log(`post to ${url}`)
        return this.http.post<any>(url, this.httpOptions);
    }

    getProdotto(id : number) : Observable<any>{
        let url =`${this.baseUrl}product/read?id=${id}`;
        return this.http.get<any>(url);
    }

    insertProdotto(payload: ProductModelRequest): Observable<ProductModelResponse>{


        console.log("insertProdotto() [prodotti.service.ts]")

        console.log("payload:"+JSON.stringify(payload))
        return this.http.post<ProductModelResponse>(this.baseUrl + "product/insert" , payload)
    }

    updateProdotto(payload: ProductModelRequest): Observable<ProductModelResponse>{
        console.log("updateProdotto() [prodotti.service.ts]")
        return this.http.post<ProductModelResponse>(this.baseUrl + "product/update", payload)

    }

    getAllByIdFactory(id:number){
        console.log("getAllByIdFactory(id:number) [prodotti.service.ts]")
        const url = `${this.baseUrl}product/getallbyidfactory?id=${id}`;
        return this.http.get<any>(url);
    }

    getProductStatistic(id:number, date:string){
        let url = this.baseUrl + `product/statistics?id=${id}&date=${date}`
        return this.http.get<any>(url)
    }


}