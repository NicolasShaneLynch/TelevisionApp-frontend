"use strict";(self.webpackChunkfrontend_contrader=self.webpackChunkfrontend_contrader||[]).push([[973],{7973:(x,h,s)=>{s.r(h),s.d(h,{default:()=>v});var u=s(6814),i=s(3302),D=s(9623),U=s(515),g=s(5313),f=s(1081),m=s(3149),e=s(5879),C=s(6025),M=s(1522),E=s(1896),I=s(7700);function b(o,r){if(1&o){const n=e.EpF();e.ynx(0),e.TgZ(1,"app-generic-table",3),e.NdJ("emitChangePage",function(t){e.CHM(n);const l=e.oxw();return e.KtG(l.changePage(t))})("emitApplicaAzioniDiGruppo",function(t){e.CHM(n);const l=e.oxw();return e.KtG(l.applicaAzioniDiGruppo(t))}),e.qZA(),e.BQk()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("pageIndex",n.pageIndex)("size",n.size)("totalElements",n.totalElements)("hasGroupActions",n.hasGroupActions)("dataSource",n.dataSource)("displayedColumns",n.displayedColumns)("cellHeadTypes",n.cellHeadTypes)("hasSearch",!1)("hasSelect",!1)}}function O(o,r){if(1&o&&(e.TgZ(0,"div",4)(1,"span"),e._uU(2),e.ALo(3,"uppercase"),e.qZA()()),2&o){const n=e.oxw();e.xp6(2),e.Oqu(e.lcZ(3,1,n.resultConstant.nessun_risultato))}}let v=(()=>{var o;class r{constructor(a,t,l,d,p,c){this.genericTableService=a,this.loaderSpinnerService=t,this.utentiService=l,this.activatedRoute=d,this.dialog=p,this.router=c,this.resultConstant=i.qA,this.size=i.aq.pageSize,this.pageIndex=i.aq.pageNumber,this.displayedColumns=i.Z0.utenti,this.cellHeadTypes={select:"checkbox",full_name:"sort",username:"sort",gender:"sort",date:"sort"},this.sortedItems={full_name:!1,username:!1,gender:!1,date:!1},this.listaUtenti=[]}ngOnInit(){this.hasGroupActions=!0,this.changePage()}getDataFromResolver(){this.totalElements=this.activatedRoute.snapshot.data.listaUtenti.totalElements,this.pageIndex=this.activatedRoute.snapshot.data.listaUtenti.pageIndex,this.listaUtenti=this.activatedRoute.snapshot.data.listaUtenti,this.listaUtenti&&(this.dataSource=new g.by(this.getMappedDataSource(this.listaUtenti)))}sortCol(){}changePage(a){this.loaderSpinnerService.show(),this.utentiService.getListaUtenti(this.size,this.pageIndex).subscribe({next:t=>{this.totalElements=t.length,this.pageIndex=a?a.number:0,t&&(this.listaUtenti=t,this.dataSource=new g.by(this.getMappedDataSource(this.listaUtenti.slice(this.pageIndex*this.size,(this.pageIndex+1)*this.size)))),this.genericTableService.emitFilteringStatus(!1),this.loaderSpinnerService.hide()},error:()=>this.loaderSpinnerService.hide()})}applicaAzioniDiGruppo(a){"Elimina"==a.azione&&this.eliminaUtenti(a.selected)}getMappedDataSource(a){return a.map(t=>{const l=[{title:i.$I.visualizza,icon:i.fb.view,type:"icon",callback:()=>this.visualizzaUtente(t.id)},{title:i.$I.modifica,icon:i.fb.edit,type:"icon",callback:()=>this.modificaUtente(t.id)},{title:i.$I.elimina,icon:i.fb.delete,type:"icon",callback:()=>this.eliminaUtente(t.id)}];return{full_name:t.userInfoDTO.name+" "+t.userInfoDTO.lastname,mail:t.username,gender:t.userInfoDTO.genderType.charAt(0)+t.userInfoDTO.genderType.substring(1).toLowerCase(),date:new Date(Date.parse(t.userInfoDTO.date)).toLocaleDateString("it-EU"),id:t.id,select:!1,username:t.username,usertype:t.usertype,action:l}})}modificaUtente(a){this.router.navigate(["/gestionale/utenti/edituser/",a],{state:{id:a}})}visualizzaUtente(a){this.router.navigate(["/gestionale/utenti/userview/",a],{state:{id:a}})}eliminaUtente(a){this.dialog.open(f.g,{width:"660px",height:"300px",disableClose:!0,data:{title:i.sD.cancella_utente,body:i.sD.cancella_user,button:"ELIMINA"}}).afterClosed().subscribe(l=>{l&&this.utentiService.deleteUser(a).subscribe(d=>{this.dialog.open(m.t,{width:"660px",height:"300px",disableClose:!0,data:{title:i.cm.delete_successful,body:i.cm.delete_successful2}}).afterClosed().subscribe(()=>{location.reload()})})})}eliminaUtenti(a){let t=a.length;this.dialog.open(f.g,{width:"660px",height:"300px",disableClose:!0,data:{title:i.sD.cancella_utenti1+t+i.sD.cancella_utenti2,body:i.sD.cancella_users,button:"ELIMINA"}}).afterClosed().subscribe(d=>{if(d){for(let _=0;_<t;_++)this.utentiService.deleteUser(a[_].id).subscribe(y=>{});let c={title:"",body:""};c=1!=t?{title:i.cm.delete_successfulMany,body:i.cm.delete_successfulMany2+t+i.cm.delete_successfulMany3}:{title:i.cm.delete_successful,body:i.cm.delete_successful2},this.dialog.open(m.t,{width:"660px",height:"300px",disableClose:!0,data:c}).afterClosed().subscribe(()=>{location.reload()})}})}}return(o=r).\u0275fac=function(a){return new(a||o)(e.Y36(C.pZ),e.Y36(C.QU),e.Y36(M.p),e.Y36(E.gz),e.Y36(I.uw),e.Y36(E.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-lista-utenti"]],standalone:!0,features:[e.jDz],decls:4,vars:2,consts:[[1,"container0"],[4,"ngIf","ngIfElse"],["noResult",""],[3,"pageIndex","size","totalElements","hasGroupActions","dataSource","displayedColumns","cellHeadTypes","hasSearch","hasSelect","emitChangePage","emitApplicaAzioniDiGruppo"],[1,"body","mt-24"]],template:function(a,t){if(1&a&&(e.TgZ(0,"div",0),e.YNc(1,b,2,9,"ng-container",1),e.YNc(2,O,4,3,"ng-template",null,2,e.W1O),e.qZA()),2&a){const l=e.MAs(3);e.xp6(1),e.Q6J("ngIf",null==t.dataSource||null==t.dataSource.data?null:t.dataSource.data.length)("ngIfElse",l)}},dependencies:[u.ez,u.O5,u.gd,D.hd,U.p],styles:[".container[_ngcontent-%COMP%]{width:100%;height:100%;padding:2px;background-color:#fff;border-radius:8px}.container[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;align-items:center;justify-content:center}.container[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.938rem;font-weight:700;color:#656d70;line-height:15px;text-decoration:none}.container0[_ngcontent-%COMP%]{width:100%;padding:12px;background-color:#fff;border-radius:8px}"]}),r})()}}]);