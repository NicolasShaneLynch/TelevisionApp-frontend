import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/utils';
import { LABEL_CONSTANT } from 'src/app/constants';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'app-delete-successful',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './delete-successful.component.html',
  styleUrls: ['./delete-successful.component.scss'],
})
export class DeleteSuccessfulComponent {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;
  title = "";
  body = "";
  button = "";
  hasButton=true;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<DeleteSuccessfulComponent>} dialog il riferimento alla modale
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<DeleteSuccessfulComponent>) {
    this.title=data.title;
    this.body=data.body;
    if (data.button!=null) this.button=data.button;
    else this.hasButton=false;
  }
  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }
}
