// Import delle dipendenze da Angular e dai moduli Material
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ProdottiService} from "../../../../services/prodotti.service";
import {GENERIC_SUCCESSFUL, INPUT_CONSTANT} from "../../../../constants";
import {Router} from "@angular/router";
import {ProductModelRequest} from "../../../../models";
import {MatDialog} from "@angular/material/dialog";
import {DeleteSuccessfulComponent} from "../../../../shared/delete-successful/delete-successful.component";
import {NgForOf, NgIf} from "@angular/common";
import {ImageDTO} from "../../../../models/image.model";

// Definizione di un'interfaccia per la struttura di ogni immagine

// Definizione del componente Angular
@Component({
    standalone: true,
    selector: 'app-modifica-prodotto',
    templateUrl: './modifica-prodotto.component.html',
    // Import dei moduli necessari al componente
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        NgIf,
        NgForOf,
        ReactiveFormsModule,
    ],
    styleUrls: ['./modifica-prodotto.component.scss']
})
// Definizione della classe del componente
export default class ModificaProdottoComponent {

    // Dichiarazione di variabili e annotazioni
    @ViewChild('fileInput') fileInput!: ElementRef;
    private id = 0;
    public idFactory = 0;
    private idImage = 0;
    public imgSrc = "";
    public userSession = "";

    // Utilizzo di un'interfaccia per definire la struttura di ogni immagine
    imageList: ImageDTO[] = [];

    // Dichiarazione di una costante
    protected readonly INPUT_CONSTANT = INPUT_CONSTANT;

    // Inizializzazione del form con il FormBuilder di Angular
    formGroup: FormGroup;

    // Costruttore del componente
    constructor(
        private dialog: MatDialog,
        private router: Router,
        private prodottiService: ProdottiService,
        private _formBuilder: FormBuilder
    ) {
        // Inizializzazione del form con il FormBuilder di Angular
        this.formGroup = this._formBuilder.group({
            name: ["", Validators.required],
            product_type: ["", Validators.required],
            price: ["", Validators.required],
            description: ["", Validators.required],
        });
    }

    // Metodo chiamato durante l'inizializzazione del componente
    ngOnInit() {
        // Recupera l'ID del prodotto dal localStorage
        this.id = Number(localStorage.getItem("productID"));
        this.userSession = JSON.parse(JSON.stringify(localStorage.getItem('userSession')))
        this.idFactory = Number(JSON.parse(this.userSession).idFactory)

        // Chiama il servizio per ottenere i dettagli del prodotto
        this.prodottiService.getProdotto(this.id).subscribe(
            response => {
                console.log(response);
                console.log(response.type)
                // Inizializza il form con i valori ottenuti dal servizio
                this.formGroup.setValue({
                    name: response.name,
                    product_type: response.type,
                    price: response.price,
                    description: response.description,
                });

                if(response.images.length > 0){
                    // Assegna i valori ottenuti dal servizio alle variabili del componente
                    //this.imgSrc = response.images[0].data
                    this.imageList = response.images.map((image: { id: string, data: string; }) => ({
                        id: image.id,
                        data: image.data
                    }));
                }
                else{
                    console.log("non ci sono immagni!!")
                }

            }
        );
    }

    // Placeholder per la funzione di modifica del prodotto
    modificaProdotto() {
        let productModelRequest: ProductModelRequest = {
            id: this.id,
            id_factory: this.idFactory,
            name: this.formGroup.value.name as string,
            description: this.formGroup.value.description as string,
            price: this.formGroup.value.price as string,
            type: this.formGroup.value.product_type as string,
            tags: [],
            images: [{id: this.idImage, data: this.imgSrc}]
        }

        this.prodottiService.updateProdotto(productModelRequest).subscribe(
            response => {
                console.log("update avvenuto con successo")
                const dialogRef = this.dialog.open(
                    DeleteSuccessfulComponent, {
                        width: '660px',
                        height: '300px',
                        disableClose: true,
                        data: {
                            title: GENERIC_SUCCESSFUL.product_update_successful,
                            body: GENERIC_SUCCESSFUL.product_update_successful2
                        }
                    });
                dialogRef.afterClosed().subscribe(() => {
                    this.router.navigate(['/gestionale/prodotti/lista']);
                })
            }
        )
    }

    // Apre il file input quando chiamato
    openFileInput() {
        this.fileInput.nativeElement.click();
    }

    deleteImage(){}

    switchImage(image:ImageDTO){
        this.imgSrc = image.data ?? this.imgSrc;
    }

    // Gestisce l'evento di selezione di un file
    onFileSelected($event: any) {
        const files: FileList = $event.target.files;

        if (files.length > 0) {
            const file: File = files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            // Aggiorna l'immagine del prodotto con il contenuto del file
            reader.onload = () => {
                this.imgSrc = reader.result as string;
            }

            // Log delle informazioni sul file
            console.log('Nome del file:', file.name);
            console.log('Dimensione del file:', file.size);
            console.log('Tipo del file:', file.type);
        }
    }
}
