"use strict";(self.webpackChunkfrontend_contrader=self.webpackChunkfrontend_contrader||[]).push([[939],{5939:(C,c,r)=>{r.r(c),r.d(c,{default:()=>v});var l=r(9623),p=r(6814),t=r(5879),g=r(1896),_=r(1522),m=r(7700),u=r(2296);function h(o,s){if(1&o&&(t.TgZ(0,"div",15),t._UZ(1,"img",16),t.qZA()),2&o){const a=t.oxw();t.xp6(1),t.Q6J("src",a.imageData,t.LSH)}}function O(o,s){if(1&o&&(t.TgZ(0,"div",15)(1,"div",17),t._uU(2),t.qZA()()),2&o){const a=t.oxw();t.xp6(2),t.Oqu(a.name[0].toUpperCase()+" "+a.lastname[0].toUpperCase())}}function Z(o,s){if(1&o){const a=t.EpF();t.TgZ(0,"div")(1,"div",0)(2,"div",7)(3,"h3"),t._uU(4),t.qZA()(),t.TgZ(5,"div",4)(6,"div",5)(7,"button",6),t.NdJ("click",function(){t.CHM(a);const e=t.oxw();return t.KtG(e.modificaFactory(e.id))}),t._uU(8,"MODIFICA"),t.qZA()()()(),t._UZ(9,"br")(10,"br"),t.TgZ(11,"div",0)(12,"div",7)(13,"h4",8),t._uU(14,"INDIRIZZO"),t.qZA(),t.TgZ(15,"p",9),t._uU(16),t.qZA()(),t.TgZ(17,"div",10)(18,"h4",8),t._uU(19,"DESCRIZIONE"),t.qZA(),t.TgZ(20,"p",9),t._uU(21),t.qZA()()()()}if(2&o){const a=t.oxw();t.xp6(4),t.Oqu(a.factory_name),t.xp6(12),t.Oqu(a.factory_address),t.xp6(5),t.Oqu(a.factory_description)}}let v=(()=>{var o;class s{constructor(n,e,i,d){this.route=n,this.utentiService=e,this.dialog=i,this.router=d,this.hasImage=!1,this.imageData="",this.id=0,this.name="",this.lastname="",this.email="",this.gender="",this.address="",this.date="",this.asterisks="",this.factory_name="",this.factory_address="",this.factory_description="",this.isAdmin=!0}ngOnInit(){let n=localStorage.getItem("userSession");null==n&&(n="");let e=JSON.parse(n);this.id=e.id,this.utentiService.readUser(this.id).subscribe(i=>{null!=i.image&&(this.imageData=i.image.data,this.hasImage=!0),this.name=i.userInfoDTO.name,this.lastname=i.userInfoDTO.lastname,this.email=i.username,this.gender=i.userInfoDTO.genderType,this.gender=this.gender.charAt(0)+this.gender.substring(1).toLowerCase(),this.address=i.userInfoDTO.address+" - "+i.userInfoDTO.city+", "+i.userInfoDTO.nation,this.date=new Date(Date.parse(i.userInfoDTO.date)).toLocaleDateString("it-EU");let d="",T=i.password.length;for(let f=0;f<T;f++)d+="*";this.asterisks=d,"ADMIN"==i.usertype?(this.factory_name=i.factoryDTO.name,this.factory_address=i.factoryDTO.address+" - "+i.factoryDTO.city+", "+i.userInfoDTO.nation,this.factory_description=i.factoryDTO.description):this.isAdmin=!1})}modificaUtente(n){this.router.navigate(["/gestionale/myprofileadmin/editmyprofile/"],{state:{id:n}})}modificaFactory(n){this.router.navigate(["/gestionale/myprofileadmin/editfactory/"],{state:{id:n}})}}return(o=s).\u0275fac=function(n){return new(n||o)(t.Y36(g.gz),t.Y36(_.p),t.Y36(m.uw),t.Y36(g.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-visualizza-profilo"]],standalone:!0,features:[t.jDz],decls:43,vars:9,consts:[[1,"container1"],[1,"compX",2,"position","relative"],["class","round-img-profile",4,"ngIf"],[1,"comp2",2,"padding-left","15px"],[1,"comp4"],[1,"button-confirm-container"],["mat-raised-button","",2,"font-weight","bold","padding-right","20px","padding-left","20px","border","1px solid #a6039b","color","#a6039b","background-color","white","float","right",3,"click"],[1,"comp1"],[2,"color","#a2a2a2"],[1,"p"],[1,"comp2"],[1,"comp3"],[1,"comp5"],[2,"color","#a2a2a2","padding-right","300px"],[4,"ngIf"],[1,"round-img-profile"],[2,"width","64px","height","64px","border-radius","32px","object-fit","cover","object-position","center",3,"src"],[1,"flex-items"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,h,2,1,"div",2),t.YNc(3,O,3,1,"div",2),t.qZA(),t.TgZ(4,"div",3)(5,"h3"),t._uU(6),t.qZA()(),t.TgZ(7,"div",4)(8,"div",5)(9,"button",6),t.NdJ("click",function(){return e.modificaUtente(e.id)}),t._uU(10,"MODIFICA"),t.qZA()()()(),t._UZ(11,"br")(12,"br"),t.TgZ(13,"div",0)(14,"div",7)(15,"h4",8),t._uU(16,"EMAIL"),t.qZA(),t.TgZ(17,"p",9),t._uU(18),t.qZA()(),t.TgZ(19,"div",10)(20,"h4",8),t._uU(21,"GENERE"),t.qZA(),t.TgZ(22,"p",9),t._uU(23),t.qZA()(),t.TgZ(24,"div",11)(25,"h4",8),t._uU(26,"INDIRIZZO"),t.qZA(),t.TgZ(27,"p",9),t._uU(28),t.qZA()(),t.TgZ(29,"div",4)(30,"h4",8),t._uU(31,"DATA CREAZIONE"),t.qZA(),t.TgZ(32,"p",9),t._uU(33),t.qZA()(),t.TgZ(34,"div",12)(35,"h4",13),t._uU(36,"PASSWORD"),t.qZA(),t.TgZ(37,"p",9),t._uU(38),t.qZA()()(),t._UZ(39,"br")(40,"br")(41,"br"),t.YNc(42,Z,22,3,"div",14)),2&n&&(t.xp6(2),t.Q6J("ngIf",e.hasImage),t.xp6(1),t.Q6J("ngIf",!e.hasImage),t.xp6(3),t.Oqu(e.name+" "+e.lastname),t.xp6(12),t.Oqu(e.email),t.xp6(5),t.Oqu(e.gender),t.xp6(5),t.Oqu(e.address),t.xp6(5),t.Oqu(e.date),t.xp6(5),t.Oqu(e.asterisks),t.xp6(4),t.Q6J("ngIf",e.isAdmin))},dependencies:[l.hd,u.lW,p.O5],styles:[".container1[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;height:100%;padding:2px;background-color:#fff;border-radius:8px}.container1[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;align-items:center;justify-content:center}.container1[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.938rem;font-weight:700;color:#656d70;line-height:15px;text-decoration:none}.comp1[_ngcontent-%COMP%], .comp2[_ngcontent-%COMP%], .comp3[_ngcontent-%COMP%], .comp4[_ngcontent-%COMP%]{flex-grow:1}.compX[_ngcontent-%COMP%]{flex-grow:0}.p[_ngcontent-%COMP%]{font-weight:700}.round-img-profile[_ngcontent-%COMP%]   .profile-image[_ngcontent-%COMP%]{max-width:100%;object-fit:cover}.round-img-profile[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%]{color:#fff;font-size:29px;line-height:1;font-weight:500}.round-img-profile[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:100px}.round-img-profile[_ngcontent-%COMP%]{width:64px;height:64px;border-radius:50%;margin-right:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:#47caff}.flex-items[_ngcontent-%COMP%]{display:flex;align-items:center;width:-moz-fit-content;width:fit-content;color:#fff;font-size:24px;line-height:1;font-weight:500}"]}),s})()}}]);