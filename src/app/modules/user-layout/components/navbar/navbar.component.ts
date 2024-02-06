import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GENERIC_CONFIRM, LABEL_CONSTANT} from "../../../../constants";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, SlicePipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {UserinfoModel} from "../../../../models/userinfo.model";
import {UtentiService} from "../../../../services/utenti.service";
import {ProfileUpdateService} from "../../../../services/eventupdateprofile.service";
import {GenericConfirmModalComponent} from "../../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    SlicePipe,
    TitleCasePipe,
    UpperCasePipe
  ],
  styleUrls: ['./navbar.component.scss']
})
export default class NavbarComponent implements OnInit {

  protected readonly localStorage = localStorage;
  isLogged: boolean = false;
  username : string = "";
  imageData : string | null = ""
  userinfo : UserinfoModel = {address: "", city: "", date: "", genderType: "", id: 0, lastname: "", name: "", nation: "", province: ""}
  @Output() cartClickEvent = new EventEmitter<string>();


  constructor(private router : Router,
              private userService : UserService,
              private utentiService : UtentiService,
              private profileUpdateService : ProfileUpdateService,
              private dialog: MatDialog) {
  }

  matMenuMyProfileClickEvent(){
    this.router.navigate(['/user/profile/']);
  }

  doLogout(){
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
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }});
  }

  cartClick(){
    console.log("cart clicked");
    this.cartClickEvent.emit();
  }

  logoClickEvent(){
    this.router.navigate(['/user/lista']);
  }

  ngOnInit(): void {
    const storedValue = localStorage.getItem('loggato');
    if (storedValue) {
      this.isLogged = JSON.parse(storedValue);
      //console.log(this.isLogged)
    }

    let userJSON = localStorage.getItem("userSession");
    if(userJSON){
      var object = JSON.parse(userJSON);
      //console.log("obj:" + object.userInfo.name);
      this.username = object.username;
      this.userinfo = object.userInfo;
      var id = object.id;
      //console.log(object.username);
    }

    this.readUser(id);

    this.profileUpdateService.onProfileUpdated().subscribe({
      next:()=>{
        //console.log("profilo aggiornato event received da navbar");
        this.readUser(id);
      }
    })

  }

  readUser(id : number){
    this.utentiService.readUser(id).subscribe({
      next: (val)=>{
        if(val.image !== null) this.imageData = val.image.data;
        this.username = val.username;
        this.userinfo = val.userInfoDTO;
      }
    })
  }

  accediButtonClick(){
    this.router.navigate(['/login']);
  }

}