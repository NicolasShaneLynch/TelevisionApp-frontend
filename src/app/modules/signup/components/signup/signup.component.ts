import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SignupService, LoginService} from "../../../../services";
import {SignupModelRequest} from "../../../../models";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ConfirmPasswordValidator} from "../../../../validators/confirmpasswordvalidator";
import {ERRORS_CONSTANT} from "../../../../constants";
@Component({
  standalone:true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
  firstFormGroup = this._formBuilder.group({
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
    checkbox:[true, Validators.requiredTrue]
  }, {validator: ConfirmPasswordValidator.MatchPassword});

  secondFormGroup = this._formBuilder.group({
    secondCtrl: [false],
    firstname:['', [Validators.required]],
    lastname:['', [Validators.required]],
    birthday:['2001-09-11', [Validators.required]],
    genre:['UOMO', [Validators.required]],
    nation:['', [Validators.required]],
    province:['', [Validators.required]],
    city:['', [Validators.required]],
    address:['', [Validators.required]]
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [false],
    factory_name : ['', [Validators.required]],
    factory_description : ['', [Validators.required]],
    factory_province : ['', [Validators.required]],
    factory_city : ['', [Validators.required]],
    factory_address : ['', [Validators.required]]
  });
  isOptional = false;
  hide : boolean = true;
  isLastButtonDisabled = false;
  //registerForm: FormGroup;
  isUserSignup : boolean = true;
  apiLoading : boolean = false;
  log="";
  log2="";
  checkBoxSelected : boolean = false;
  constructor(private router : Router,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private signupService: SignupService) {
    /*this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.snapshot.url]);*/

  }
  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  onUsertypeChanged(event: MatSelectChange): void {
    // Logica da eseguire quando cambia la selezione
    const selectedValue = (event.value);
    if(event.value == "user"){
      this.isUserSignup = true;
    }else if(event.value == "admin"){
      this.isUserSignup = false;
    }
    //console.log('Valore selezionato:', selectedValue);
  }

  register(){
    this.isLastButtonDisabled = true;
    this.apiLoading = true;
    //console.log(this.firstFormGroup.value);
    //console.log(this.secondFormGroup.value);
    //console.log(this.thirdFormGroup.value);
    let signupRequest : SignupModelRequest = {
      email:this.firstFormGroup.value.email as string,
      usertype:this.firstFormGroup.value.usertype as string,
      password:this.firstFormGroup.value.password as string,
      lastname:this.secondFormGroup.value.lastname as string,
      firstname:this.secondFormGroup.value.firstname as string,
      birthday:this.secondFormGroup.value.birthday as string,
      genre:this.secondFormGroup.value.genre as string,
      nation:this.secondFormGroup.value.nation as string,
      province:this.secondFormGroup.value.province as string,
      city:this.secondFormGroup.value.city as string,
      address:this.secondFormGroup.value.address as string,
      factory_name:this.thirdFormGroup.value.factory_name as string,
      factory_description:this.thirdFormGroup.value.factory_description as string,
      factory_province:this.thirdFormGroup.value.factory_province as string,
      factory_city:this.thirdFormGroup.value.factory_city as string,
      factory_address: this.thirdFormGroup.value.factory_address as string
    }
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && (this.thirdFormGroup.valid || this.isUserSignup)) {
      this.log=this.log2="";
      this.signupService.checkEmail(signupRequest.email).subscribe({
        next: value  => {
          if (value) this.log = "Email già in uso";
          if (!this.isUserSignup) {
            this.signupService.checkFactoryName(signupRequest.factory_name).subscribe({
              next: value => {
                if (value) this.log2 = "Nome azienda già in uso";
                if (this.log == this.log2) {
                  this.signupService.signup(signupRequest).subscribe({
                    next: value => {
                      //console.log(`Next value: ${value}`);
                      this.router.navigate(['/register/success'])
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
              this.signupService.signup(signupRequest).subscribe({
                next: value => {
                  //console.log(`Next value: ${value}`);
                  this.router.navigate(['/register/success'])
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

  /*@ViewChild('btn1') button:ElementRef | null = null;

  btn1Click(){

    this.button!.nativeElement.click;
  }*/
}

//lo usero' in futuro per controllare se l'email è stata gia' presa.
/*export function myValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value as string;
    console.log(value);

    if (!value) {
      // Se il campo è vuoto, consideralo valido
      return null;
    }

    // Controlla se la stringa contiene almeno una lettera maiuscola
    if (/[A-Z]/.test(value)) {
      // La stringa contiene una lettera maiuscola, quindi è valida
      return null;
    } else {
      // La stringa non contiene lettere maiuscole, restituisci un errore
      return { noUpperCase: true };
    }
  };
}*/
