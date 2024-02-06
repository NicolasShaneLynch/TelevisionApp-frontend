import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-signup-blank',
  templateUrl: './signup-blank.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./signup-blank.component.scss']
})
export default class SignupBlankComponent {

}
