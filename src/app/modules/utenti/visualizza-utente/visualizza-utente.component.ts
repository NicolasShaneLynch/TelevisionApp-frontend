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
import {GENERIC_CONFIRM, GENERIC_SUCCESSFUL} from "../../../constants";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-visualizza-utente',
  standalone: true,
  templateUrl: './visualizza-utente.component.html',
  styleUrls: ['./visualizza-utente.component.scss'],
    imports: [
        AngularMaterialModule,
        NgIf
    ]
})
export default class VisualizzaUtenteComponent {
    hasImage=false;
    imageData : string | null = "";
  id:number=0;
    name:string="";
    lastname:string="";
  email:string="";
  gender:string="";
  address:string="";
  date:string="";
    isAdmin:boolean=true;
    factory_name:string="";
    factory_address:string="";
    factory_description:string="";

  constructor(
      private route: ActivatedRoute,
      private utentiService: UtentiService,
      private dialog: MatDialog,
      private router: Router
  ) {}
  ngOnInit() {
    let id0 = this.route.snapshot.paramMap.get('id');
    if (id0==null) this.id=0;
    else this.id=parseInt(id0);
    let id=this.id;
    this.utentiService.readUser(id).subscribe(
        result => {
            if (result.image!=null) {this.imageData=result.image.data; this.hasImage=true;}
            this.name=result.userInfoDTO.name;
            this.lastname=result.userInfoDTO.lastname;
          this.email=result.username;
          this.gender=result.userInfoDTO.genderType;
          this.gender = this.gender.charAt(0) + this.gender.substring(1).toLowerCase();
          this.address=result.userInfoDTO.address+" - "+result.userInfoDTO.city+", "+"00000";
          this.date= new Date(Date.parse(result.userInfoDTO.date)).toLocaleDateString("it-EU");
          this.isAdmin=(result.usertype=="ADMIN");
          if (this.isAdmin) {
              this.factory_address=result.factoryDTO.address;
              this.factory_description=result.factoryDTO.description;
              this.factory_name=result.factoryDTO.name;
          }
        }
    );
  }
  modificaUtente(id: number) {
      this.router.navigate(['/gestionale/utenti/edituser',id], { state: { id: id } });
  }
  eliminaUtente(id: number) {
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
            data: {title: GENERIC_CONFIRM.cancella_utente, body: GENERIC_CONFIRM.cancella_user, button: "ELIMINA"}
        }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.utentiService.deleteUser(id).subscribe(
            result => {
              const dialogRef = this.dialog.open(
                  DeleteSuccessfulComponent, {
                      width: '660px',
                      height: '300px',
                      disableClose: true,
                      data: {title: GENERIC_SUCCESSFUL.delete_successful, body: GENERIC_SUCCESSFUL.delete_successful2}
                  });
              dialogRef.afterClosed().subscribe(() => {
                this.router.navigate(['/gestionale/utenti']);
              })
            }
        );
      }
    });
  }
}
