import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';
import {BUTTON_CONSTANT, GENERIC_CONFIRM, LABEL_CONSTANT} from 'src/app/constants';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'app-generic-confirm-modal',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './generic-confirm-modal.component.html',
  styleUrls: ['./generic-confirm-modal.component.scss'],
})
export class GenericConfirmModalComponent {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;
  buttonConstant = BUTTON_CONSTANT;
  title = "";
  body0 = "Procedendo eliminerai";
  body = "";
  button = "";
  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<GenericConfirmModalComponent>} dialog il riferimento alla modale
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<GenericConfirmModalComponent>) {
    this.title = data.title;
    this.body = data.body;
    this.button = data.button;
    if (data.body0!=null) this.body0=data.body0;
  }
  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }
  confirm() {
    this.dialog.close(true);
  }

  protected readonly BUTTON_CONSTANT = BUTTON_CONSTANT;
}
