import {Component, EventEmitter, Output} from '@angular/core';
import NavbarComponent from "../../../user-layout/components/navbar/navbar.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {CartCommunicationService, NotificationService} from "../../../../services";
import {ProductModelResponse} from "../../../../models/product.model";
import {ProdottiService} from "../../../../services/prodotti.service";
import {NgForOf, SlicePipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
    imports: [
        NavbarComponent,
        MatCardModule,
        NavbarComponent,
        NavbarComponent,
        MatButtonModule,
        NgForOf,
        SlicePipe
    ],
  styleUrls: ['./dettaglio.component.scss']
})
export default class DettaglioComponent {

    @Output() addToCartClickEvent: EventEmitter<string | null> = new EventEmitter<string | null>();
    product: ProductModelResponse = {description: "", id: 0, id_factory: 0, name: "", price: 0, tags: [], type: "", images: []};

    constructor(private activatedRoute : ActivatedRoute,
                private router : Router,
                private cartCommunicationService : CartCommunicationService,
                private productService : ProdottiService,
                private notificationService : NotificationService) {

    }

    addToCart(){
        if(this.product.id != 0) {
            //let id_product: string | null = this.activatedRoute.snapshot.paramMap.get('id');
            //this.addToCartClickEvent.emit(id_product);
            this.cartCommunicationService.emettiEvento(this.product);
        }
    }

    ngOnInit(){
        //this.getDataFromResolver();
        let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.activatedRoute.snapshot.paramMap.get('id'));
        this.productService.getProdotto(id).subscribe({
            next: (value)=>{
                console.log("value: ");
                console.log(value);
                this.product = value;

            },
            error: (err) =>{
                console.log("in errore: ");
                console.log(err);
                this.notificationService.show("Prodotto non disponibile!", 2500, "error");
                this.router.navigate(['/user/lista']);
            }
        })
    }

    /*getDataFromResolver(){
        this.prodotto = this.activatedRoute.snapshot.data['prodotto'];
    }*/
}
