import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {MatStepperModule} from "@angular/material/stepper";
import {DeleteSuccessfulComponent} from "../../../../shared/delete-successful/delete-successful.component";
import {GENERIC_SUCCESSFUL} from "../../../../constants";
import {MatDialog} from "@angular/material/dialog";

@Component({
  standalone: true,
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss'],
  imports: [
    RouterModule,
    MatButtonModule,
    MatStepperModule,
  ]
})

export default class SignupSuccessComponent {
  constructor(private router : Router,
              private dialog: MatDialog) {
  }
  ngOnInit() {
    const dialogRef = this.dialog.open(
        DeleteSuccessfulComponent, {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title: GENERIC_SUCCESSFUL.register_successful, body: GENERIC_SUCCESSFUL.register_successful2, button: GENERIC_SUCCESSFUL.return_to_login}
        });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}
