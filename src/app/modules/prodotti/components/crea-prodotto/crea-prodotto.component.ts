import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AngularMaterialModule } from "../../../../utils";
import { GENERIC_SUCCESSFUL, INPUT_CONSTANT } from "../../../../constants";
import { ProductModelRequest } from "../../../../models/product.model";
import { ProdottiService } from "../../../../services/prodotti.service";
import { DeleteSuccessfulComponent } from "../../../../shared/delete-successful/delete-successful.component";
import { NgForOf } from "@angular/common";
import {ImageDTO} from "../../../../models/image.model";
// Definizione dell'interfaccia Image


@Component({
    standalone: true,
    selector: 'app-crea-prodotto',
    templateUrl: './crea-prodotto.component.html',
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        NgForOf,
    ],
    styleUrls: ['./crea-prodotto.component.scss']
})
export default class CreaProdottoComponent {

    public userSession = JSON.parse(JSON.stringify(localStorage.getItem('userSession')))
    public idFactory = Number(JSON.parse(this.userSession).idFactory);

    @ViewChild('fileInput')
    fileInput!: ElementRef;

    imgSrc: string = "";
    fileList: ImageDTO[] = [];
    fileName = "";
    fileSize = 0;
    fileType = "";
    fileBase64 = "";

    constructor(
        private _formBuilder: FormBuilder,
        private prodottiService: ProdottiService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    // Definizione del form con FormBuilder
    formGroup = this._formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        product_type: ['', Validators.required],
    });

    // Costante per i valori di input
    protected readonly INPUT_CONSTANT = INPUT_CONSTANT;

    // Funzione per inserire un nuovo prodotto
    insertProdotto() {
        let productModelRequest: ProductModelRequest = {
            id: 0,
            id_factory: this.idFactory,
            name: this.formGroup.value.name as string,
            description: this.formGroup.value.description as string,
            price: this.formGroup.value.price as string,
            type: this.formGroup.value.product_type as string,
            tags: [],
            images: [],
        };

        if (this.fileList.length === 5) {
            this.fileList.forEach((image, index) => {
                productModelRequest.images.push({
                    id: image.id,
                    data: image.data
                });
            });
            if (this.formGroup.valid) {
                this.prodottiService.insertProdotto(productModelRequest).subscribe(
                    {
                        next: value => {
                            console.log(`Next value: ${value}`);
                            // Dialogo di successo
                            const dialogRef = this.dialog.open(
                                DeleteSuccessfulComponent, {
                                    width: '660px',
                                    height: '300px',
                                    disableClose: true,
                                    data: {
                                        title: GENERIC_SUCCESSFUL.product_create_successful,
                                        body: GENERIC_SUCCESSFUL.product_create_successful2
                                    }
                                }); //success

                            dialogRef.afterClosed().subscribe(() => {
                                this.router.navigate(['/gestionale/prodotti/lista']);
                            });
                        }, error: (err) => {
                            console.log("ERROR")
                            console.log(err);
                        }
                    }
                );
            } else { console.log("FORM NOT VALID") }
        }
        else {
            console.log("fileList not Valid")
            // Dialogo di errore nel caso non siano impostate 5 immagini
            this.dialog.open(
                DeleteSuccessfulComponent, {
                    width: '660px',
                    height: '300px',
                    disableClose: true,
                    data: {
                        title: "ERRORE IMMAGINI",
                        body: "Devi impostare 5 immagini"
                    }
                });

        }
    }

    // Apre l'input file quando chiamato
    openFileInput() {
        this.fileInput.nativeElement.click();
    }

    // Gestisce l'evento di selezione di un file
    onFileSelected($event: any) {
        const files: FileList = $event.target.files;

        if (files.length > 0) {
            const file: File = files[0];

            this.fileName = file.name;
            this.fileSize = file.size;
            this.fileType = file.type;

            console.log('Nome del file:', this.fileName);
            console.log('Dimensione del file:', this.fileSize);
            console.log('Tipo del file:', this.fileType);

            // Legge il file come base64
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fileBase64 = reader.result as string;
                console.log('Base64 del file:', this.fileBase64);
                // Aggiunge un oggetto Image all'array
                this.fileList.push({ id: this.fileList.length, data: this.fileBase64 });
            }
        }
    }

    // Gestisce la selezione di un'immagine
    onImageSelected(image: ImageDTO) {
        this.imgSrc = image.data ?? this.imgSrc;
    }

    // Cancella l'immagine selezionata
    deleteImage() {
        this.imgSrc = "";
    }
}
