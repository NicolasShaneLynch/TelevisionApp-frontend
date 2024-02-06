import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {UserinfoModel} from "../../../../models/userinfo.model";
import {UtentiService} from "../../../../services/utenti.service";
import {DatePipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-myprofile-layout',
  templateUrl: './myprofile-layout.component.html',
  imports: [
    RouterOutlet,
    MatButtonModule,
    DatePipe
  ],
  styleUrls: ['./myprofile-layout.component.scss']
})

export default class MyprofileLayoutComponent implements OnInit{

  userinfo : UserinfoModel;
  username :string = "";
  imageData : string = "";
  constructor(private router : Router,
              private utentiService : UtentiService) {
    this.userinfo = {address: "", city: "", date: "", genderType: "", id: 0, lastname: "", name: "", nation: "", province: ""}
  }
  btnModifyClickEvent(){
    this.router.navigate(['/user/profile/modify']);

  }

  ngOnInit(){

    let userJSON = localStorage.getItem("userSession");
    if(userJSON){
      var object = JSON.parse(userJSON);
      console.log("obj:" + object.userInfo.name);
      this.userinfo = object.userInfo;
      this.username = object.username;
      console.log(object.username);
      var id = object.id;
    }

    this.utentiService.readUser(id).subscribe({
      next:(res)=>{
        this.imageData = res.image.data;
      }
    })



  }

}
