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
import {ERRORS_CONSTANT, GENERIC_CONFIRM, GENERIC_SUCCESSFUL, INPUT_CONSTANT} from "../../../constants";
import {MatDialog} from "@angular/material/dialog";
import {UtentiService} from "../../../services/utenti.service";
import {UpdateModelRequest} from "../../../models/update.model";
import {GenericConfirmModalComponent} from "../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {ConfirmPasswordValidator} from "../../../validators/confirmpasswordvalidator";
@Component({
  standalone:true,
  selector: 'app-inserisci-utente',
  templateUrl: '../modifica-utente/modifica-utente.component.html',
  styleUrls: ['../modifica-utente/modifica-utente.component.scss'],
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
  hasImage=false;
  errorsConstant: any = ERRORS_CONSTANT;
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
  FormGroup = this._formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.pattern(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      ),
      Validators.minLength(3),
      Validators.maxLength(128),
    ]
    ],
    password:[
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ],
    ],
    password2:[
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ],
    ],
    firstCtrl : [false],
    usertype:['user',Validators.required],
    checkbox:[true, Validators.requiredTrue],
    secondCtrl: [false],
    firstname:['', [Validators.required]],
    lastname:['', [Validators.required]],
    birthday:['', [Validators.required]],
    genre:['man', [Validators.required]],
    nation:['', [Validators.required]],
    province:['', [Validators.required]],
    city:['', [Validators.required]],
    address:['', [Validators.required]],
    thirdCtrl: [false]
  }, {validator: ConfirmPasswordValidator.MatchPassword});
  isOptional = false;
  hide : boolean = true;
  isLastButtonDisabled = false;
  //registerForm: FormGroup;
  isAdmin : boolean = true;
  apiLoading : boolean = false;
  checkBoxSelected : boolean = false;
  log="";
  log2="";
  constructor(private router : Router,
              private utentiService: UtentiService,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              private signupService: SignupService) {
  }
  ngOnInit() {
    let id0 = this.route.snapshot.paramMap.get('id');
    if (id0==null) this.id=0;
    else this.id=parseInt(id0);
    let id=this.id;
    this.utentiService.readUser(id).subscribe(
        result => {
          if (result.image!=null) {this.imageData=result.image.data; this.hasImage=true;}
          this.userinfo_id=result.userInfoDTO.id;
          this.email=result.username;
          this.password=result.password;
          if (result.usertype=="ADMIN") this.usertype="admin";
          else { this.usertype="user"; this.isAdmin = false; }
          this.name=result.userInfoDTO.name;
          this.lastname=result.userInfoDTO.lastname;
          if (result.userInfoDTO.genderType=="UOMO") this.gender="man";
          else this.gender="woman";
          this.date = result.userInfoDTO.date;
          this.nation=result.userInfoDTO.nation;
          this.province=result.userInfoDTO.province;
          this.city=result.userInfoDTO.city;
          this.address=result.userInfoDTO.address;
          this.FormGroup = this._formBuilder.group({
            email: [this.email, [
              Validators.required,
              Validators.pattern(
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
              ),
              Validators.minLength(3),
              Validators.maxLength(128),
            ]
            ],
            password:[
              this.password,
              [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(64),
              ],
            ],
            password2:[
              this.password,
              [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(64),
              ],
            ],
            firstCtrl : [false],
            usertype:['user',Validators.required],
            checkbox:[true, Validators.requiredTrue],
            secondCtrl: [false],
            firstname:[this.name, [Validators.required]],
            lastname:[this.lastname, [Validators.required]],
            birthday:[this.date.toLocaleString("EU-it"), [Validators.required]],
            genre:['man', [Validators.required]],
            nation:[this.nation, [Validators.required]],
            province:[this.province, [Validators.required]],
            city:[this.city, [Validators.required]],
            address:[this.address, [Validators.required]],
            thirdCtrl: [false]
          }, {validator: ConfirmPasswordValidator.MatchPassword});
          if (this.isAdmin) {
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
          } else this.cart_id=result.cart.id;
        }
    );
  }
  goToUsers(){
    this.router.navigate(['/gestionale/utenti']);
  }

  onUsertypeChanged(event: MatSelectChange): void {
    // Logica da eseguire quando cambia la selezione
    if(event.value == "user"){
      this.isAdmin = false;
    }else if(event.value == "admin"){
      this.isAdmin = true;
    }
  }
  openFileInput(){
    this.fileInput.nativeElement.click();
  }
  onFileSelected($event: any) {
    const files: FileList = $event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
    }
  }
  update(){
    let gender = this.FormGroup.value.genre?.toUpperCase();
    if (gender=="MAN") gender = "UOMO";
    else gender = "DONNA";
    let updateRequest : UpdateModelRequest = {
      id:this.id,
      factory_id:this.factory_id,
      userinfo_id:this.userinfo_id,
      cart_id:this.cart_id,
      email:this.FormGroup.value.email as string,
      usertype:this.FormGroup.value.usertype?.toUpperCase() as string,
      password:this.FormGroup.value.password as string,
      lastname:this.FormGroup.value.lastname as string,
      firstname:this.FormGroup.value.firstname as string,
      birthday:this.FormGroup.value.birthday as string,
      genre: gender as string,
      nation:this.FormGroup.value.nation as string,
      province:this.FormGroup.value.province as string,
      city:this.FormGroup.value.city as string,
      address:this.FormGroup.value.address as string,
      factory_name:this.FormGroup2.value.factory_name as string,
      factory_description:this.FormGroup2.value.factory_description as string,
      factory_province:this.FormGroup2.value.factory_province as string,
      factory_city:this.FormGroup2.value.factory_city as string,
      factory_address: this.FormGroup2.value.factory_address as string,
      image: {id: this.id, data: this.imageData}
    }
    if(this.FormGroup.valid && (this.FormGroup2.valid || !this.isAdmin)) {
      this.log=this.log2="";
      this.signupService.checkEmail(updateRequest.email,updateRequest.id).subscribe({
        next: value  => {
          if (value) this.log = "Email già in uso";
          if (this.isAdmin) {
            this.signupService.checkFactoryName(updateRequest.factory_name,updateRequest.factory_id).subscribe({
              next: value => {
                if (value) this.log2 = "Nome azienda già in uso";
                if (this.log == this.log2) {
                  this.signupService.update(updateRequest).subscribe({
                    next: value => {
                      const dialogRef = this.dialog.open(
                          DeleteSuccessfulComponent, {
                            width: '660px',
                            height: '300px',
                            disableClose: true,
                            data: {title: GENERIC_SUCCESSFUL.update_successful, body: GENERIC_SUCCESSFUL.update_successful2}
                          });
                      dialogRef.afterClosed().subscribe(() => {

                        this.goToUsers();
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
          } else {
            if (this.log == this.log2) {
              this.signupService.update(updateRequest).subscribe({
                next: value => {
                  const dialogRef = this.dialog.open(
                      DeleteSuccessfulComponent, {
                        width: '660px',
                        height: '300px',
                        disableClose: true,
                        data: {title: GENERIC_SUCCESSFUL.update_successful, body: GENERIC_SUCCESSFUL.update_successful2}
                      });
                  dialogRef.afterClosed().subscribe(() => {

                    this.goToUsers();
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
        }
      })
    }else{
      this.apiLoading = false;
      this.isLastButtonDisabled = false;
    }
  }
  elimina() {
    let id = this.id;
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
                this.router.navigate(['/gestionale/utenti/lista']);
              })
            }
        );
      }
    });
  }
  protected readonly INPUT_CONSTANT = INPUT_CONSTANT;
  protected readonly ERRORS_CONSTANT = ERRORS_CONSTANT;
}
