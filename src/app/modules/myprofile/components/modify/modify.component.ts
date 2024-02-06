import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtentiService} from "../../../../services/utenti.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {ConfirmPasswordValidator} from "../../../../validators/confirmpasswordvalidator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf, NgStyle} from "@angular/common";
import {UserModelDTO} from "../../../../models/user.model";
import {UserinfoModel} from "../../../../models";
import {Router} from "@angular/router";
import {CartModelDTO} from "../../../../models/cart.model";
import {FactoryModelDTO} from "../../../../models/factory.model";
import {ProfileUpdateService} from "../../../../services/eventupdateprofile.service";
import {LoginService, SignupService} from "../../../../services";
import {DeleteSuccessfulComponent} from "../../../../shared/delete-successful/delete-successful.component";
import {ERRORS_CONSTANT, GENERIC_CONFIRM, GENERIC_SUCCESSFUL} from "../../../../constants";
import {MatDialog} from "@angular/material/dialog";
import {GenericConfirmModalComponent} from "../../../../shared/generic-confirm-modal/generic-confirm-modal.component";

@Component({
  standalone: true,
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./modify.component.scss']
})
export default class ModifyComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  errorsConstant: any = ERRORS_CONSTANT;
  user? : UserModelDTO;
  log:string="";
  hide : boolean = true;
  imageData : string = "";
  firstFormGroup:FormGroup<any> = this._formBuilder.group({
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
      [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ],
    ],
    usertype:['user',Validators.required],
  }, {validator: ConfirmPasswordValidator.MatchPassword});

  secondFormGroup = this._formBuilder.group({
    firstname:['', [Validators.required]],
    lastname:['', [Validators.required]],
    birthday:['', [Validators.required]],
    genre:['UOMO', [Validators.required]],
    nation:['', [Validators.required]],
    province:['', [Validators.required]],
    city:['', [Validators.required]],
    address:['', [Validators.required]]
  });

  constructor(private utentiService : UtentiService,
              private _formBuilder: FormBuilder,
              private router : Router,
              private dialog: MatDialog,
              private profileUpdateService : ProfileUpdateService,
              private loginService : LoginService,
              private signupService : SignupService) {

  }

  openFileInput(){
    this.fileInput.nativeElement.click();
  }

  goToProfile(){
    this.router.navigate(['user/profile']);
  }

  onFileSelected($event: any) {

    const files: FileList = $event.target.files;

    if (files.length > 0) {
      const file: File = files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageData = reader.result as string
      }

      console.log('Nome del file:', file.name);
      console.log('Dimensione del file:', file.size);
      console.log('Tipo del file:', file.type);

      console.log()


    }
  }

  ngOnInit(): void {
    let userJSON = localStorage.getItem("userSession");
    console.log("json modify: "+userJSON)
    if(userJSON){
      var object = JSON.parse(userJSON);

      console.log(object.id)
      console.log("obj:" + object.userInfo.name);
    }

    this.utentiService.readUser(object.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.user = res;
        var userInfoDTO : UserinfoModel = res.userInfoDTO;
        if(res.image !== null) this.imageData = res.image?.data;
        //console.log(this.imageData);
        this.firstFormGroup = this._formBuilder.group({
          email: [this.user!.username, [
            Validators.required,
            Validators.pattern(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            ),
            Validators.minLength(3),
            Validators.maxLength(128),
          ]
          ],
          password:[
            this.user!.password,
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(64),
            ],
          ],
          password2:[
            this.user!.password,
            [Validators.required,
              Validators.minLength(8),
              Validators.maxLength(64),
            ],
          ],
          usertype:['user',Validators.required],
        }, {validator: ConfirmPasswordValidator.MatchPassword});


        this.secondFormGroup = this._formBuilder.group({
          firstname:[userInfoDTO.name, [Validators.required]],
          lastname:[userInfoDTO.lastname, [Validators.required]],
          birthday:[userInfoDTO.date, [Validators.required]],
          genre:[userInfoDTO.genderType, [Validators.required]],
          nation:[userInfoDTO.nation, [Validators.required]],
          province:[userInfoDTO.province, [Validators.required]],
          city:[userInfoDTO.city, [Validators.required]],
          address:[userInfoDTO.address, [Validators.required]]
        });

      }

    })
  }

  deleteProfile() {
    let id = -1;
    if(this.user!.id !== null) id = this.user!.id;
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title: GENERIC_CONFIRM.cancella_utente, body: GENERIC_CONFIRM.cancella_profilo, button: "ELIMINA"}
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
                    data: {title: GENERIC_SUCCESSFUL.profile_delete_successful, body: GENERIC_SUCCESSFUL.profile_delete_successful2}
                  });
              dialogRef.afterClosed().subscribe(() => {
                this.router.navigate(['/login']);
              })
            }
        );
      }
    });
  }

  updateProfile(){
    var userInfoDTO : UserinfoModel = {address: this.secondFormGroup.value.address as string, city: this.secondFormGroup.value.city as string, date: this.secondFormGroup.value.birthday as string, genderType: this.secondFormGroup.value.genre as string, id: this.user!.userInfoDTO.id, lastname: this.secondFormGroup.value.lastname as string, name: this.secondFormGroup.value.firstname as string, nation: this.secondFormGroup.value.nation as string, province: this.secondFormGroup.value.province as string}
    var factoryDTO : FactoryModelDTO = {address: "", city: "", description: "", id: 0, idUser: 0, name: "", province: ""}
    var user : UserModelDTO = {cart: this.user!.cart, factoryDTO:  this.user!.factoryDTO, id: this.user!.id, orders: this.user!.orders, password: this.firstFormGroup.value.password, userInfoDTO: userInfoDTO, username: this.firstFormGroup.value.email, usertype: this.user!.usertype, image: {id: this.user!.id, data: this.imageData}};
    if(this.firstFormGroup.valid) {
      this.log="";
      this.signupService.checkEmail(user.username,user.id).subscribe({
        next: value => {
          if (value) this.log = "Email già in uso";
          if (this.log == "") {
            this.loginService.setUtenteSession(user!.username, user!.userInfoDTO, user!.usertype, user!.id);
            this.utentiService.updateUser(user).subscribe({
              next:(value)=>{
                this.profileUpdateService.updateProfile();
                const dialogRef = this.dialog.open(
                    DeleteSuccessfulComponent, {
                      width: '660px',
                      height: '300px',
                      disableClose: true,
                      data: {title: GENERIC_SUCCESSFUL.profile_update_successful, body: GENERIC_SUCCESSFUL.profile_update_successful2}
                    });
                dialogRef.afterClosed().subscribe(() => {
                  this.goToProfile();
                })
              }
            });
          }
        }
      })
    }
  }
  protected readonly ERRORS_CONSTANT = ERRORS_CONSTANT;
}
