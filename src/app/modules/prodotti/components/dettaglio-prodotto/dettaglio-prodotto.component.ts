import {Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ProductModelResponse} from "../../../../models";
import {ActivatedRoute, Router} from "@angular/router";
import {CartCommunicationService, NotificationService} from "../../../../services";
import {ProdottiService} from "../../../../services/prodotti.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
    standalone: true,
    selector: 'app-dettaglio-prodotto',
    templateUrl: './dettaglio-prodotto.component.html',
    imports: [
        MatButtonModule,
        MatCardModule,
        NgIf,
        NgForOf,
        SlicePipe,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./dettaglio-prodotto.component.scss']
})
export default class DettaglioProdottoComponent {

    @Output() addToCartClickEvent: EventEmitter<string | null> = new EventEmitter<string | null>();
    product: ProductModelResponse = {
        description: "",
        id: 0,
        id_factory: 0,
        name: "",
        price: 0,
        tags: [],
        type: "",
        images: []
    };

    private id = 0;
    public idFactory = 0;
    public idImage = 0
    private name = "";
    private product_type = "";
    private price = "";
    private description = "";
    private images = ""
    public imgSrc = "";
    public userSession = ""


    formGroup = this._formBuilder.group({
        name: ["", Validators.required],
        product_type: ["", Validators.required],
        price: ["", Validators.required],
        description: ["", Validators.required],
    });

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private cartCommunicationService: CartCommunicationService,
                private productService: ProdottiService,
                private notificationService: NotificationService,
                private _formBuilder: FormBuilder) {

    }


    ngOnInit() {
        //this.getDataFromResolver();
        let productId = Number(localStorage.getItem("productID"))
        this.productService.getProdotto(productId).subscribe({
            next: (response) => {
                this.product = response;
                this.name = response.name;
                this.product_type = response.type;
                this.price = response.price;
                this.description = response.description;

                this.formGroup = this._formBuilder.group(
                    {
                        name: [this.name, Validators.required],
                        product_type: [this.product_type, Validators.required],
                        price: [this.price, Validators.required],
                        description: [this.description, Validators.required],
                    }
                );

                console.log(response.images)


            },
            error: (err) => {
                console.log("in errore: ");
                console.log(err);
                this.notificationService.show("Prodotto non disponibile!", 2500, "error");
                this.router.navigate(['gestionale/prodotti/lista']);
            }
        })
    }


    modifcaProdotto(){
        this.router.navigate(['gestionale/prodotti/modifica-prodotto'])
    }


}
