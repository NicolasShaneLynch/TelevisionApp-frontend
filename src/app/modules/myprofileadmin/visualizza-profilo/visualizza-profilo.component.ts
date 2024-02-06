import { Component } from '@angular/core';
import {AngularMaterialModule} from "../../../utils";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {ProdottiService} from "../../../services/prodotti.service";
import {UserService} from "../../../services/user.service";
import {DeleteSuccessfulComponent} from "../../../shared/delete-successful/delete-successful.component";
import {UtentiService} from "../../../services/utenti.service";
import {GenericTableService, LoaderSpinnerService} from "../../../services";
import {MatDialog} from "@angular/material/dialog";
import {GenericConfirmModalComponent} from "../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {GENERIC_CONFIRM} from "../../../constants";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-visualizza-profilo',
  standalone: true,
  templateUrl: './visualizza-profilo.component.html',
  styleUrls: ['./visualizza-profilo.component.scss'],
    imports: [
        AngularMaterialModule,
        NgIf
    ]
})
export default class VisualizzaProfiloComponent {
    hasImage=false;
    imageData : string | null = "";
  id:number=0;
    name:string="";
    lastname:string="";
  email:string="";
  gender:string="";
  address:string="";
    date:string="";
    asterisks:string="";
    factory_name:string="";
    factory_address:string="";
    factory_description:string="";
    isAdmin:boolean=true;
  constructor(
      private route: ActivatedRoute,
      private utentiService: UtentiService,
      private dialog: MatDialog,
      private router: Router
  ) {}
  ngOnInit() {
      let str = localStorage.getItem('userSession');
      if (str==null) str = "";
      let loggedUser = JSON.parse(str);
      this.id = loggedUser.id;
      this.utentiService.readUser(this.id).subscribe(
        result => {
            if (result.image!=null) {this.imageData = result.image.data; this.hasImage=true;}
          this.name=result.userInfoDTO.name;
          this.lastname=result.userInfoDTO.lastname;
          this.email=result.username;
          this.gender=result.userInfoDTO.genderType;
          this.gender = this.gender.charAt(0) + this.gender.substring(1).toLowerCase();
          this.address=result.userInfoDTO.address+" - "+result.userInfoDTO.city+", "+result.userInfoDTO.nation;
          this.date= new Date(Date.parse(result.userInfoDTO.date)).toLocaleDateString("it-EU");
          let a = "";
          let l = result.password.length;
          for (let i=0;i<l;i++) {
              a=a+"*";
          }
          this.asterisks=a;
          if (result.usertype=="ADMIN") {
            this.factory_name=result.factoryDTO.name;
            this.factory_address=result.factoryDTO.address+" - "+result.factoryDTO.city+", "+result.userInfoDTO.nation;
            this.factory_description=result.factoryDTO.description;
          } else this.isAdmin=false;
        }
    );
  }
    modificaUtente(id: number) {
        this.router.navigate([`/gestionale/myprofileadmin/editmyprofile/`], { state: { id: id } });
    }
    modificaFactory(id: number) {
        this.router.navigate([`/gestionale/myprofileadmin/editfactory/`], { state: { id: id } });
    }
}
