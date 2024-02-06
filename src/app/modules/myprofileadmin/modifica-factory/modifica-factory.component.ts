import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SignupService, LoginService} from "../../../services";
import {SignupModelRequest} from "../../../models";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DeleteSuccessfulComponent} from "../../../shared/delete-successful/delete-successful.component";
import {GENERIC_SUCCESSFUL, INPUT_CONSTANT} from "../../../constants";
import {MatDialog} from "@angular/material/dialog";
import {UtentiService} from "../../../services/utenti.service";
import {UpdateModelRequest} from "../../../models/update.model";
@Component({
  standalone:true,
  selector: 'app-modifica-factory',
  templateUrl: '../modifica-factory/modifica-factory.component.html',
  styleUrls: ['../modifica-factory/modifica-factory.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ]
})
export default class UpdateComponent{
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageData : string | null = "";
  id:number=0;
  userinfo_id:number=0;
  factory_id:number=0;
  cart_id:number=0;
  email="";
  password="";
  usertype="";
  lastname ="";
  name="";
  date: Date= new Date;
  gender="";
  nation="";
  province="";
  city="";
  address="";
  factory_name="";
  factory_province="";
  factory_city="";
  factory_address="";
  factory_description="";
  FormGroup2 = this._formBuilder.group({
    factory_name : [this.factory_name, [Validators.required]],
    factory_description : ['', [Validators.required]],
    factory_province : ['', [Validators.required]],
    factory_city : ['', [Validators.required]],
    factory_address : ['', [Validators.required]]
  });
  hide : boolean = true;
  isLastButtonDisabled = false;
  apiLoading : boolean = false;
  log: string="";
  constructor(private router : Router,
              private utentiService: UtentiService,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              private signupService: SignupService) {
  }
  ngOnInit() {
    let str = localStorage.getItem('userSession');
    if (str==null) str = "";
    let loggedUser = JSON.parse(str);
    this.id = loggedUser.id;
    this.utentiService.readUser(this.id).subscribe(
        result => {
          if (result.image!=null) this.imageData=result.image.data;
          this.userinfo_id=result.userInfoDTO.id;
          this.email=result.username;
          this.password=result.password;
          this.usertype=result.usertype;
          this.name=result.userInfoDTO.name;
          this.lastname=result.userInfoDTO.lastname;
          this.gender=result.userInfoDTO.genderType;
          this.date = result.userInfoDTO.date;
          this.nation=result.userInfoDTO.nation;
          this.province=result.userInfoDTO.province;
          this.city=result.userInfoDTO.city;
          this.address=result.userInfoDTO.address;
          this.factory_id=result.factoryDTO.id;
          this.factory_name=result.factoryDTO.name;
          this.factory_province=result.factoryDTO.province;
          this.factory_city=result.factoryDTO.city;
          this.factory_address=result.factoryDTO.address;
          this.factory_description=result.factoryDTO.description;
          this.FormGroup2 = this._formBuilder.group({
            factory_name : [this.factory_name, [Validators.required]],
            factory_description : [this.factory_description, [Validators.required]],
            factory_province : [this.factory_province, [Validators.required]],
            factory_city : [this.factory_city, [Validators.required]],
            factory_address : [this.factory_address, [Validators.required]]
          });
        }
    );
  }
  goToProfile(){
    this.router.navigate(['/gestionale/myprofileadmin']);
  }
  update(){
    let updateRequest : UpdateModelRequest = {
      id:this.id,
      factory_id:this.factory_id,
      userinfo_id:this.userinfo_id,
      cart_id:this.cart_id,
      email:this.email,
      usertype:this.usertype,
      password:this.password,
      lastname:this.lastname,
      firstname:this.name,
      birthday:this.date.toLocaleString("EU-it"),
      genre: this.gender,
      nation:this.nation,
      province:this.province as string,
      city:this.city as string,
      address:this.address as string,
      factory_name:this.FormGroup2.value.factory_name as string,
      factory_description:this.FormGroup2.value.factory_description as string,
      factory_province:this.FormGroup2.value.factory_province as string,
      factory_city:this.FormGroup2.value.factory_city as string,
      factory_address: this.FormGroup2.value.factory_address as string,
      image: {id: this.id, data: this.imageData}
    }
    if(this.FormGroup2.valid) {
      this.log="";
      this.signupService.checkFactoryName(updateRequest.factory_name,updateRequest.factory_id).subscribe({
        next: value  => {
          if (value) this.log = "Nome già in uso";
          if (this.log == "") {
            this.signupService.update(updateRequest).subscribe({
              next: value => {
                const dialogRef = this.dialog.open(
                    DeleteSuccessfulComponent, {
                      width: '660px',
                      height: '300px',
                      disableClose: true,
                      data: {title: GENERIC_SUCCESSFUL.factory_update_successful, body: GENERIC_SUCCESSFUL.factory_update_successful2}
                    });
                dialogRef.afterClosed().subscribe(() => {
                  this.goToProfile();
                })
              },
              error: error => {
                console.log(error)
                console.error(`Error: ${error.message}`);
                this.isLastButtonDisabled = false;
                this.apiLoading = false;
              },
              complete: () => {
                console.log('Observable complete');
              }
            });
          } else {
            this.isLastButtonDisabled = false;
            this.apiLoading = false;
          }
        }
      })
    }else{
      this.apiLoading = false;
      this.isLastButtonDisabled = false;
    }
  }
  protected readonly INPUT_CONSTANT = INPUT_CONSTANT;
}
