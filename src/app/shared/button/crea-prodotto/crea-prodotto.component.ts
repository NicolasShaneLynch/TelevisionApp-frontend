import { Component } from '@angular/core';
import {BUTTON_CONSTANT} from "../../../constants";
import {MatDialog} from "@angular/material/dialog";
import {WorkInProgressComponent} from "../../work-in-progress/work-in-progress.component";
import {AngularMaterialModule} from "../../../utils";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-crea-prodotto',
  templateUrl: './crea-prodotto.component.html',
  imports: [
    AngularMaterialModule
  ],
  styleUrls: ['./crea-prodotto.component.scss']
})
export class CreaProdottoComponent {
  buttonConstant = BUTTON_CONSTANT

  constructor(
      private router: Router,
      private dialog: MatDialog) {}


  /** Funzione per l'apertura del dialog di creazione utente, conterrà al suo interno tutte informazioni per la corretta apertura della modale */
  redirect(){
    this.router.navigate(["/gestionale/prodotti/crea-prodotto"])
  }


}
