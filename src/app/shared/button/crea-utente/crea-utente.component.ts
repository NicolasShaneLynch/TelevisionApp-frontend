import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { AngularMaterialModule } from 'src/app/utils';
import { WorkInProgressComponent } from '../..';
import { BUTTON_CONSTANT } from 'src/app/constants';
import {Router} from "@angular/router";

/** Componente per il bottone di creazione nuovo utente */
@Component({
  selector: 'app-crea-utente',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './crea-utente.component.html',
  styleUrls: ['./crea-utente.component.scss']
})
export class CreaUtenteComponent {
  /** Costante per la label del button */
  buttonConstant = BUTTON_CONSTANT

  constructor(private dialog: MatDialog,
              private router: Router) {}


  /** Funzione per l'apertura del dialog di creazione utente, conterrà al suo interno tutte informazioni per la corretta apertura della modale */
  openDialog() {
    this.router.navigate(['/gestionale/utenti/insertuser']);
  }
}
