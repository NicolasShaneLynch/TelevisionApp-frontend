import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-users-blank',
  templateUrl: './users-blank.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./users-blank.component.scss']
})
export default class UsersBlankComponent {

}
