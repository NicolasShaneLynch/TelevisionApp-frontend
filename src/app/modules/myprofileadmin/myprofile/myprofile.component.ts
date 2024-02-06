import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Componente per il rendirizzamento alla rotta principale del modulo utenti */
@Component({
  selector: 'app-myprofileadmin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export default class MyprofileadminComponent {

}
