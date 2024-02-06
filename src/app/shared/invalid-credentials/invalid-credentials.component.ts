import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';
import { LABEL_CONSTANT } from 'src/app/constants';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'app-invalid-credentials',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './invalid-credentials.component.html',
  styleUrls: ['./invalid-credentials.component.scss'],
})
export class InvalidCredentialsComponent {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<InvalidCredentialsComponent>} dialog il riferimento alla modale
   */
  constructor(private dialog: MatDialogRef<InvalidCredentialsComponent>) {}

  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }
}
