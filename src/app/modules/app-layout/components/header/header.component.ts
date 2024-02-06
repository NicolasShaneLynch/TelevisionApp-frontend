import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import { Subscription } from 'rxjs';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { LoginService } from 'src/app/services';
import {
  GENERIC_CONFIRM,
  // GENERIC_CONFIRM,
  LABEL_CONSTANT
} from 'src/app/constants';
  import { AngularMaterialModule } from 'src/app/utils';
import { SessioneUtenteModel } from 'src/app/models';
import { WorkInProgressComponent } from 'src/app/shared';
import {GenericConfirmModalComponent} from "../../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {UtentiService} from "../../../../services/utenti.service";
import {filter} from "rxjs/operators";
// import { SetTextByUrlPipe } from 'src/app/pipes';

// import { GenericConfirmModalComponent } from 'src/app/shared/components/generic-confirm-modal/generic-confirm-modal.component';

/** Una classe per il componente dell'header */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    // SetTextByUrlPipe,
  ],
})
export class HeaderComponent implements OnInit {
  hasImage= false;
  name: string = "";
  lastname: string = "";
  imageData : string | null = ""
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;
  /** Subscription all'observable degli eventi di aggiornamento nominativo utente */
  nominativoUtenteListener!: Subscription;
  /** Il nominativo dell'utente */
  sessioneUtente!: SessioneUtenteModel;
  /** Indica se l'utente è ADMIN */
  isAdmin!: boolean;

  /**
   * Il costruttore della classe.
   * @param {LoginService} loginService L'injectable del service Login
   * @param {ActivatedRoute} activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   * @param dialog
   */
  constructor(
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utentiService : UtentiService,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Si imposta il nominativo dell'utente prendendolo dal LocalStorage
   * Si effettua la sottoscrizione all'observable dell'evento di aggiornamento nominativo dell'utente
   */
  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Call a method or perform actions to refresh your component
      this.refreshComponent();
    });
    this.sessioneUtente = this.loginService.getUtenteSessione();
    let str = localStorage.getItem('userSession');
    if (str==null) str = "";
    let id = JSON.parse(str).id;
    this.utentiService.readUser(id).subscribe({
      next: (val)=>{
        if (val.image!=null) {this.imageData = val.image.data; this.hasImage=true;}
        this.name=val.userInfoDTO.name;
        this.lastname=val.userInfoDTO.lastname;
      }
    })
  }
  refreshComponent() {
    this.sessioneUtente = this.loginService.getUtenteSessione();
    let str = localStorage.getItem('userSession');
    if (str==null) str = "";
    let id = JSON.parse(str).id;
    this.utentiService.readUser(id).subscribe({
      next: (val)=>{
        if (val.image!=null) {this.imageData = val.image.data; this.hasImage=true;}
        this.name=val.userInfoDTO.name;
        this.lastname=val.userInfoDTO.lastname;
      }
    })
  }
  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable.
   */
  ngOnDestroy(): void {
    if (this.nominativoUtenteListener) {
      this.nominativoUtenteListener.unsubscribe();
    }
  }
  matMenuMyProfileClickEvent(){
    this.router.navigate(['/gestionale/myprofileadmin/myprofileview']);
  }
  /**
   * Mostra la modale di conferma logout.
   * Alla chiusura della modale se si è confermato il logout, viene effettuato.
   */
  // this.router.navigate(['/login'])
  logout(): void {
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title:GENERIC_CONFIRM.effettua_logout,body0:"Procedendo effettuerai",body:"il logout.",button:"LOGOUT"}
        }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loginService.logout();
      }});
  }
}
