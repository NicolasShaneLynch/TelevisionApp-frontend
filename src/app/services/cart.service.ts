import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {ProductModelResponse} from "../models/product.model";

@Injectable({
    providedIn: 'root',
})
export class CartCommunicationService {
    private cartSource = new Subject<any>();
    addToCart = this.cartSource.asObservable();

    emettiEvento(data: ProductModelResponse): void {
        this.cartSource.next(data);
    }
}