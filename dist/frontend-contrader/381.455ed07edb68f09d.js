"use strict";(self.webpackChunkfrontend_contrader=self.webpackChunkfrontend_contrader||[]).push([[381],{3381:(G,v,r)=>{r.r(v),r.d(v,{default:()=>F});var c=r(1896),i=r(6223),g=r(2296),O=r(1545),p=r(9157),Z=r(2032),T=r(6385),A=r(5986),C=r(617),b=r(8525),d=r(8034),U=r(6814),I=r(5940),x=r(3149),l=r(3302),P=r(7914),e=r(5879),q=r(7700),M=r(1522),y=r(6025),E=r(3680);const D=["fileInput"];function w(s,_){if(1&s&&(e.TgZ(0,"div"),e._UZ(1,"br")(2,"br"),e.TgZ(3,"form",12)(4,"div",1)(5,"p",30),e._uU(6),e.qZA()(),e.TgZ(7,"div",1)(8,"p",13),e._uU(9,"Informazioni Azienda"),e.qZA()(),e.TgZ(10,"div",1)(11,"mat-form-field",14)(12,"mat-label"),e._uU(13,"Nome"),e.qZA(),e._UZ(14,"input",40),e.qZA(),e._UZ(15,"mat-label",41),e.qZA(),e.TgZ(16,"div",1)(17,"mat-form-field",14)(18,"mat-label"),e._uU(19,"Indirizzo"),e.qZA(),e._UZ(20,"input",42),e.qZA(),e.TgZ(21,"mat-form-field",14)(22,"mat-label"),e._uU(23,"Provincia"),e.qZA(),e._UZ(24,"input",43),e.qZA(),e.TgZ(25,"mat-form-field",14)(26,"mat-label"),e._uU(27,"Citt\xe0"),e.qZA(),e._UZ(28,"input",44),e.qZA()(),e.TgZ(29,"div",1)(30,"mat-form-field",45)(31,"mat-label"),e._uU(32,"Descrizione"),e.qZA(),e._UZ(33,"textarea",46),e.qZA()(),e.TgZ(34,"div",1)(35,"p",29),e._uU(36),e.qZA()()()()),2&s){const u=e.oxw();e.xp6(3),e.Q6J("formGroup",u.FormGroup2),e.xp6(3),e.Oqu(u.log2),e.xp6(30),e.Oqu(u.INPUT_CONSTANT.campi_obbligatori)}}let F=(()=>{var s;class _{constructor(n,t,o,a,f,m,h){this.router=n,this.route=t,this._formBuilder=o,this.dialog=a,this.utentiService=f,this.loginService=m,this.signupService=h,this.errorsConstant=l.sm,this.FormGroup=this._formBuilder.group({email:["",[i.kI.required,i.kI.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),i.kI.minLength(3),i.kI.maxLength(128)]],password:["",[i.kI.required,i.kI.minLength(8),i.kI.maxLength(64)]],password2:["",[i.kI.required,i.kI.minLength(8),i.kI.maxLength(64)]],firstCtrl:[!1],usertype:["user",i.kI.required],checkbox:[!0,i.kI.requiredTrue],secondCtrl:[!1],firstname:["",[i.kI.required]],lastname:["",[i.kI.required]],birthday:["",[i.kI.required]],genre:["man",[i.kI.required]],nation:["",[i.kI.required]],province:["",[i.kI.required]],city:["",[i.kI.required]],address:["",[i.kI.required]],thirdCtrl:[!1]},{validator:P.R.MatchPassword}),this.FormGroup2=this._formBuilder.group({factory_name:["",[i.kI.required]],factory_description:["",[i.kI.required]],factory_province:["",[i.kI.required]],factory_city:["",[i.kI.required]],factory_address:["",[i.kI.required]]}),this.imageData="",this.isOptional=!1,this.hide=!0,this.isLastButtonDisabled=!1,this.isUserSignup=!0,this.apiLoading=!1,this.checkBoxSelected=!1,this.log="",this.log2="",this.INPUT_CONSTANT=l.aq,this.ERRORS_CONSTANT=l.sm}ngOnInit(){}goToUsers(){this.router.navigate(["/gestionale/utenti"])}onUsertypeChanged(n){"user"==n.value?this.isUserSignup=!0:"admin"==n.value&&(this.isUserSignup=!1)}openFileInput(){this.fileInput.nativeElement.click()}onFileSelected(n){const t=n.target.files;if(t.length>0){const o=t[0];let a=new FileReader;a.readAsDataURL(o),a.onload=()=>{this.imageData=a.result}}}register(){this.isLastButtonDisabled=!0,this.apiLoading=!0;let n={email:this.FormGroup.value.email,usertype:this.FormGroup.value.usertype,password:this.FormGroup.value.password,lastname:this.FormGroup.value.lastname,firstname:this.FormGroup.value.firstname,birthday:this.FormGroup.value.birthday,genre:this.FormGroup.value.genre,nation:this.FormGroup.value.nation,province:this.FormGroup.value.province,city:this.FormGroup.value.city,address:this.FormGroup.value.address,factory_name:this.FormGroup2.value.factory_name,factory_description:this.FormGroup2.value.factory_description,factory_province:this.FormGroup2.value.factory_province,factory_city:this.FormGroup2.value.factory_city,factory_address:this.FormGroup2.value.factory_address};this.FormGroup.valid&&(this.FormGroup2.valid||this.isUserSignup)?(this.log=this.log2="",this.signupService.checkEmail(n.email).subscribe({next:t=>{t&&(this.log="Email gi\xe0 in uso"),this.isUserSignup?this.log==this.log2?this.signupService.signup(n).subscribe({next:o=>{this.dialog.open(x.t,{width:"660px",height:"300px",disableClose:!0,data:{title:l.cm.insert_successful,body:l.cm.insert_successful2}}).afterClosed().subscribe(()=>{this.goToUsers()})},error:o=>{console.log(o),console.error(`Error: ${o.message}`),this.isLastButtonDisabled=!1,this.apiLoading=!1},complete:()=>{console.log("Observable complete")}}):(this.isLastButtonDisabled=!1,this.apiLoading=!1):this.signupService.signup(n).subscribe({next:o=>{this.loginService.login({username:this.FormGroup.value.email,password:this.FormGroup.value.password,rememberMe:!1}).subscribe({next:f=>{this.utentiService.readUser(f.id).subscribe({next:m=>{let h={id:m.id,factory_id:m.factoryDTO.id,userinfo_id:m.userInfoDTO.id,cart_id:m.cart.id,email:this.FormGroup.value.email,usertype:this.FormGroup.value.usertype?.toUpperCase(),password:this.FormGroup.value.password,lastname:this.FormGroup.value.lastname,firstname:this.FormGroup.value.firstname,birthday:this.FormGroup.value.birthday,genre:this.FormGroup.value.genre,nation:this.FormGroup.value.nation,province:this.FormGroup.value.province,city:this.FormGroup.value.city,address:this.FormGroup.value.address,factory_name:this.FormGroup2.value.factory_name,factory_description:this.FormGroup2.value.factory_description,factory_province:this.FormGroup2.value.factory_province,factory_city:this.FormGroup2.value.factory_city,factory_address:this.FormGroup2.value.factory_address,image:{id:m.id,data:this.imageData}};this.signupService.update(h).subscribe({next:L=>{this.dialog.open(x.t,{width:"660px",height:"300px",disableClose:!0,data:{title:l.cm.insert_successful,body:l.cm.insert_successful2}}).afterClosed().subscribe(()=>{this.goToUsers()})}})}})}})},error:o=>{console.log(o),console.error(`Error: ${o.message}`),this.isLastButtonDisabled=!1,this.apiLoading=!1},complete:()=>{console.log("Observable complete")}})}})):(this.apiLoading=!1,this.isLastButtonDisabled=!1)}}return(s=_).\u0275fac=function(n){return new(n||s)(e.Y36(c.F0),e.Y36(c.gz),e.Y36(i.qu),e.Y36(q.uw),e.Y36(M.p),e.Y36(y.r6),e.Y36(y.Or))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-inserisci-utente"]],viewQuery:function(n,t){if(1&n&&e.Gf(D,5),2&n){let o;e.iGM(o=e.CRH())&&(t.fileInput=o.first)}},standalone:!0,features:[e.jDz],decls:113,vars:19,consts:[[1,"container0"],[1,"container2"],[1,"compX",2,"position","relative"],[2,"width","64px","height","64px","border-radius","32px","object-fit","cover","object-position","center",3,"src"],["type","file",2,"display","none",3,"change"],["fileInput",""],[2,"border-radius","50%","width","28px","height","28px","background-color","#a6039b","bottom","4px","right","-8px","position","absolute","display","flex","align-items","center","justify-content","center","cursor","pointer",3,"click"],[2,"color","white","font-size","15px","width","fit-content","height","fit-content"],[1,"comp2",2,"padding-left","15px"],[1,"comp4"],[1,"button-confirm-container"],["mat-raised-button","",2,"padding-right","80px","padding-left","80px","background-color","#a6039b","color","white","float","right",3,"click"],[3,"formGroup"],[1,"p"],["appearance","outline",2,"flex-grow","1","padding-right","10px"],["matInput","","formControlName","lastname","name","lastname","required","","maxlength","255"],["matInput","","formControlName","firstname","name","firstname","required","","maxlength","255"],["formControlName","genre",2,"display","none"],["value","man"],["value","woman"],["mat-icon-button","","matSuffix",""],[2,"color","grey"],["matInput","","formControlName","birthday","placeholder","Scegli data",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["matInput","","formControlName","nation","required","","maxlength","255"],["matInput","","formControlName","province","required","","maxlength","2"],["matInput","","formControlName","city","required","","maxlength","255"],["matInput","","formControlName","address","required","","maxlength","255"],[1,"p3"],[1,"error"],["appearance","outline",2,"flex-grow","1","padding-right","10px","width","700px"],["matInput","","formControlName","email","name","email","required","","maxlength","128"],["formControlName","usertype",3,"selectionChange"],["value","user"],["value","admin"],["name","password","matInput","","formControlName","password","required","","maxlength","64",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["name","password2","matInput","","formControlName","password2","required","","maxlength","64",3,"type"],[4,"ngIf"],["matInput","","formControlName","factory_name","required","","maxlength","255"],[2,"flex-grow","1","padding-right","220px"],["matInput","","formControlName","factory_address","required","","maxlength","255"],["matInput","","formControlName","factory_province","required","","maxlength","2"],["matInput","","formControlName","factory_city","required","","maxlength","255"],["appearance","outline",1,"example-full-width",2,"flex-grow","1","padding-right","10px","width","1400px","max-height","173px","min-height","173px"],["matInput","","required","","formControlName","factory_description","rows","7",2,"resize","none"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"input",4,5),e.NdJ("change",function(a){return t.onFileSelected(a)}),e.qZA(),e.TgZ(6,"div",6),e.NdJ("click",function(){return t.openFileInput()}),e.TgZ(7,"mat-icon",7),e._uU(8,"edit"),e.qZA()()(),e.TgZ(9,"div",8)(10,"h3"),e._uU(11,"Nuovo Utente"),e.qZA()(),e.TgZ(12,"div",9)(13,"div",10)(14,"button",11),e.NdJ("click",function(){return t.register()}),e._uU(15,"SALVA"),e.qZA()()()(),e._UZ(16,"br")(17,"br"),e.TgZ(18,"form",12)(19,"div",1)(20,"p",13),e._uU(21,"Informazioni Generali"),e.qZA()(),e.TgZ(22,"div",1)(23,"mat-form-field",14)(24,"mat-label"),e._uU(25,"Cognome"),e.qZA(),e._UZ(26,"input",15),e.qZA(),e.TgZ(27,"mat-form-field",14)(28,"mat-label"),e._uU(29,"Nome"),e.qZA(),e._UZ(30,"input",16),e.qZA()(),e.TgZ(31,"div",1)(32,"mat-form-field",14)(33,"mat-label"),e._uU(34,"Genere"),e.qZA(),e.TgZ(35,"mat-select",17)(36,"mat-option",18),e._uU(37,"Uomo"),e.qZA(),e.TgZ(38,"mat-option",19),e._uU(39,"Donna"),e.qZA()(),e.TgZ(40,"button",20)(41,"mat-icon",21),e._uU(42),e.qZA()()(),e.TgZ(43,"mat-form-field",14)(44,"mat-label"),e._uU(45,"Data"),e.qZA(),e._UZ(46,"input",22)(47,"mat-datepicker-toggle",23)(48,"mat-datepicker",null,24),e.qZA()(),e.TgZ(50,"div",1)(51,"mat-form-field",14)(52,"mat-label"),e._uU(53,"Nazione"),e.qZA(),e._UZ(54,"input",25),e.qZA(),e.TgZ(55,"mat-form-field",14)(56,"mat-label"),e._uU(57,"Provincia"),e.qZA(),e._UZ(58,"input",26),e.qZA(),e.TgZ(59,"mat-form-field",14)(60,"mat-label"),e._uU(61,"Citt\xe0"),e.qZA(),e._UZ(62,"input",27),e.qZA(),e.TgZ(63,"mat-form-field",14)(64,"mat-label"),e._uU(65,"Indirizzo"),e.qZA(),e._UZ(66,"input",28),e.qZA()(),e.TgZ(67,"div",1)(68,"p",29),e._uU(69),e.qZA()(),e._UZ(70,"br")(71,"br"),e.TgZ(72,"div",1)(73,"p",30),e._uU(74),e.qZA()(),e.TgZ(75,"div",1)(76,"p",13),e._uU(77,"Informazioni Accesso"),e.qZA()(),e.TgZ(78,"div",1)(79,"mat-form-field",31)(80,"mat-label"),e._uU(81,"Email"),e.qZA(),e._UZ(82,"input",32),e.TgZ(83,"mat-error"),e._uU(84),e.qZA()(),e.TgZ(85,"mat-form-field",31)(86,"mat-label"),e._uU(87,"Tipologia Utente"),e.qZA(),e.TgZ(88,"mat-select",33),e.NdJ("selectionChange",function(a){return t.onUsertypeChanged(a)}),e.TgZ(89,"mat-option",34),e._uU(90,"User"),e.qZA(),e.TgZ(91,"mat-option",35),e._uU(92,"Admin"),e.qZA()()()(),e.TgZ(93,"div",1)(94,"mat-form-field",14)(95,"mat-label"),e._uU(96,"Password"),e.qZA(),e._UZ(97,"input",36),e.TgZ(98,"button",37),e.NdJ("click",function(){return t.hide=!t.hide}),e.TgZ(99,"mat-icon"),e._uU(100),e.qZA()(),e.TgZ(101,"mat-error"),e._uU(102),e.qZA()(),e.TgZ(103,"mat-form-field",14)(104,"mat-label"),e._uU(105,"Conferma password"),e.qZA(),e._UZ(106,"input",38),e.TgZ(107,"button",37),e.NdJ("click",function(){return t.hide=!t.hide}),e.TgZ(108,"mat-icon"),e._uU(109),e.qZA()(),e.TgZ(110,"mat-error"),e._uU(111),e.qZA()()()(),e.YNc(112,w,37,3,"div",39),e.qZA()),2&n){const o=e.MAs(49);e.xp6(3),e.Q6J("src",t.imageData,e.LSH),e.xp6(15),e.Q6J("formGroup",t.FormGroup),e.xp6(24),e.Oqu("arrow_drop_down"),e.xp6(4),e.Q6J("matDatepicker",o),e.xp6(1),e.Q6J("for",o),e.xp6(22),e.Oqu(t.INPUT_CONSTANT.campi_obbligatori),e.xp6(5),e.Oqu(t.log),e.xp6(10),e.Oqu(t.FormGroup.controls.email.hasError("pattern")?t.errorsConstant.input.email_pattern:""===t.FormGroup.controls.email.value?t.errorsConstant.required:t.FormGroup.controls.email.hasError("minlength")?t.errorsConstant.input.min_length_3:t.errorsConstant.input.max_length_128),e.xp6(13),e.Q6J("type",t.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",t.hide),e.xp6(2),e.Oqu(t.hide?"visibility_off":"visibility"),e.xp6(2),e.Oqu(""===t.FormGroup.controls.password.value?"Campo obbligatorio":t.FormGroup.controls.password.hasError("minlength")?"Almeno 8 caratteri":""),e.xp6(4),e.Q6J("type",t.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",t.hide),e.xp6(2),e.Oqu(t.hide?"visibility_off":"visibility"),e.xp6(2),e.Oqu(t.FormGroup.controls.password2.hasError("passwordMismatch")?"Le password devono coincidere":""),e.xp6(1),e.Q6J("ngIf",!t.isUserSignup)}},dependencies:[U.ez,U.O5,c.Bz,g.ot,g.lW,g.RK,O.T5,i.u5,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.nD,i.UX,i.sg,i.u,p.lN,p.KE,p.hX,p.TO,p.R9,T.t,Z.c,Z.Nt,A.p9,C.Ps,C.Hw,b.LD,b.gD,E.ey,d.FA,d.Mq,d.hl,d.nW,I.Cq],styles:['.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;background-color:#0a4a89;background-size:cover;background-repeat:no-repeat;background-position:center center}[_nghost-%COMP%]     .mat-mdc-form-field-subscript-wrapper{height:10px!important}[_nghost-%COMP%]     .mat-mdc-form-field{margin:0!important}[_nghost-%COMP%]     .mat-stepper-horizontal-line{margin:-1!important;border-top-width:-1!important;border-top-style:solid;flex:none;height:19px!important;margin:0!important;min-width:0!important;border-top-color:transparent!important}[_nghost-%COMP%]     .mat-stepper-horizontal-line:before{content:">"}[_nghost-%COMP%]     .mat-step-icon-state-edit{background-color:#41cf0d}.styled-image[_ngcontent-%COMP%]{position:fixed;top:20px;left:20px;width:200px;height:130px;color:#fff}.form-cont[_ngcontent-%COMP%]{width:50%;padding:20px;border-radius:15px;background-color:#fff}.bottom-form-bar[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;height:40px;margin-top:10px}.form-input-row[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.mat-stepper-horizontal[_ngcontent-%COMP%]{margin-top:8px}.mat-mdc-form-field[_ngcontent-%COMP%]{margin-top:16px}.container2[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;height:100%;padding:2px;background-color:#fff;border-radius:8px}.container2[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;align-items:center;justify-content:center}.container2[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.938rem;font-weight:700;color:#656d70;line-height:15px;text-decoration:none}.comp1[_ngcontent-%COMP%], .comp2[_ngcontent-%COMP%], .comp3[_ngcontent-%COMP%], .comp4[_ngcontent-%COMP%]{flex-grow:1}.compX[_ngcontent-%COMP%]{flex-grow:0}.p[_ngcontent-%COMP%]{color:#9b999d;font-weight:700}.p2[_ngcontent-%COMP%]{color:#9b999d}.p3[_ngcontent-%COMP%]{color:#9b999d;font-size:12px}.error[_ngcontent-%COMP%]{text-align:center;margin-bottom:16px;white-space:pre-line;font-size:1.5rem;font-weight:500;color:#d32f2f;line-height:19px}.round-img-profile[_ngcontent-%COMP%]{width:64px;height:64px;border-radius:50%;margin-right:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:#47caff}.flex-items[_ngcontent-%COMP%]{display:flex;align-items:center;width:-moz-fit-content;width:fit-content;color:#fff;font-size:24px;line-height:1;font-weight:500}.container0[_ngcontent-%COMP%]{width:100%;padding:12px;background-color:#fff;border-radius:8px}.line[_ngcontent-%COMP%]{background-color:#fff}']}),_})()}}]);