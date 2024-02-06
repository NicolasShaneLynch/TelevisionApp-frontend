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
import {LoginModelRequest, LoginModelResponse, SignupModelRequest} from "../../../models";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DeleteSuccessfulComponent} from "../../../shared/delete-successful/delete-successful.component";
import {ERRORS_CONSTANT, GENERIC_SUCCESSFUL, INPUT_CONSTANT} from "../../../constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPasswordValidator} from "../../../validators/confirmpasswordvalidator";
import {UpdateModelRequest} from "../../../models/update.model";
import {UtentiService} from "../../../services/utenti.service";
@Component({
  standalone:true,
  selector: 'app-inserisci-utente',
  templateUrl: './inserisci-utente.component.html',
  styleUrls: ['./inserisci-utente.component.scss'],
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
export default class SignupComponent{
  errorsConstant: any = ERRORS_CONSTANT;
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
  FormGroup2 = this._formBuilder.group({
    factory_name : ['', [Validators.required]],
    factory_description : ['', [Validators.required]],
    factory_province : ['', [Validators.required]],
    factory_city : ['', [Validators.required]],
    factory_address : ['', [Validators.required]]
  });
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageData : string | null = "";
  isOptional = false;
  hide : boolean = true;
  isLastButtonDisabled = false;
  //registerForm: FormGroup;
  isUserSignup : boolean = true;
  apiLoading : boolean = false;
  checkBoxSelected : boolean = false;
  log="";
  log2="";
  constructor(private router : Router,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              private utentiService: UtentiService,
              private loginService: LoginService,
              private signupService: SignupService) {
  }
  ngOnInit() {
  }

  goToUsers(){
    this.router.navigate(['/gestionale/utenti']);
  }

  onUsertypeChanged(event: MatSelectChange): void {
    // Logica da eseguire quando cambia la selezione
    const selectedValue = (event.value);
    if(event.value == "user"){
      this.isUserSignup = true;
    }else if(event.value == "admin"){
      this.isUserSignup = false;
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
  register(){
    this.isLastButtonDisabled = true;
    this.apiLoading = true;
    let signupRequest : SignupModelRequest = {
      email:this.FormGroup.value.email as string,
      usertype:this.FormGroup.value.usertype as string,
      password:this.FormGroup.value.password as string,
      lastname:this.FormGroup.value.lastname as string,
      firstname:this.FormGroup.value.firstname as string,
      birthday:this.FormGroup.value.birthday as string,
      genre:this.FormGroup.value.genre as string,
      nation:this.FormGroup.value.nation as string,
      province:this.FormGroup.value.province as string,
      city:this.FormGroup.value.city as string,
      address:this.FormGroup.value.address as string,
      factory_name:this.FormGroup2.value.factory_name as string,
      factory_description:this.FormGroup2.value.factory_description as string,
      factory_province:this.FormGroup2.value.factory_province as string,
      factory_city:this.FormGroup2.value.factory_city as string,
      factory_address: this.FormGroup2.value.factory_address as string
    }
    if(this.FormGroup.valid && (this.FormGroup2.valid || this.isUserSignup)) {
      this.log=this.log2="";
      this.signupService.checkEmail(signupRequest.email).subscribe({
        next: value  => {
          if (value) this.log = "Email già in uso";
          if (!this.isUserSignup) {
            this.signupService.signup(signupRequest).subscribe({
              next: value => {
                let loginModelRequest = {username:this.FormGroup.value.email,password:this.FormGroup.value.password,rememberMe:false}
                this.loginService.login(loginModelRequest).subscribe({
                  next: (r:LoginModelResponse) => {
                    this.utentiService.readUser(r.id).subscribe({
                      next: (res) => {
                        let updateRequest : UpdateModelRequest = {
                          id:res.id,
                          factory_id:res.factoryDTO.id,
                          userinfo_id:res.userInfoDTO.id,
                          cart_id:res.cart.id,
                          email:this.FormGroup.value.email as string,
                          usertype:this.FormGroup.value.usertype?.toUpperCase() as string,
                          password:this.FormGroup.value.password as string,
                          lastname:this.FormGroup.value.lastname as string,
                          firstname:this.FormGroup.value.firstname as string,
                          birthday:this.FormGroup.value.birthday as string,
                          genre: this.FormGroup.value.genre as string,
                          nation:this.FormGroup.value.nation as string,
                          province:this.FormGroup.value.province as string,
                          city:this.FormGroup.value.city as string,
                          address:this.FormGroup.value.address as string,
                          factory_name:this.FormGroup2.value.factory_name as string,
                          factory_description:this.FormGroup2.value.factory_description as string,
                          factory_province:this.FormGroup2.value.factory_province as string,
                          factory_city:this.FormGroup2.value.factory_city as string,
                          factory_address: this.FormGroup2.value.factory_address as string,
                          image: {id: res.id, data: this.imageData}
                        }
                        this.signupService.update(updateRequest).subscribe({
                          next: (res) => {
                            const dialogRef = this.dialog.open(
                                DeleteSuccessfulComponent, {
                                  width: '660px',
                                  height: '300px',
                                  disableClose: true,
                                  data: {title: GENERIC_SUCCESSFUL.insert_successful, body: GENERIC_SUCCESSFUL.insert_successful2}
                                });
                            dialogRef.afterClosed().subscribe(() => {
                              this.goToUsers();
                            })
                          }
                        });
                      }
                    })
                  }
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
            if (this.log == this.log2) {
              this.signupService.signup(signupRequest).subscribe({
                next: value => {
                  const dialogRef = this.dialog.open(
                      DeleteSuccessfulComponent, {
                        width: '660px',
                        height: '300px',
                        disableClose: true,
                        data: {title: GENERIC_SUCCESSFUL.insert_successful, body: GENERIC_SUCCESSFUL.insert_successful2}
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
  protected readonly INPUT_CONSTANT = INPUT_CONSTANT;
  protected readonly ERRORS_CONSTANT = ERRORS_CONSTANT;
}
