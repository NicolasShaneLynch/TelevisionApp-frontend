import {Component, OnInit, ViewChild} from '@angular/core';
import NavbarComponent from "../../../user-layout/components/navbar/navbar.component";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {UserService} from "../../../../services/user.service";
import {ProductModelRequest} from "../../../../models";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../services";
import {FiltroPerInizioNomePipe, FiltroPerTipo, PriceFilter} from "../../../../pipes/search.pipe";
import {MatSliderModule} from "@angular/material/slider";

@Component({
  standalone: true,
  selector: 'app-lista',
  templateUrl: './lista.component.html',
    imports: [
        NavbarComponent,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        CommonModule,
        MatSidenavModule,
        NavbarComponent,
        MatDividerModule,
        FiltroPerInizioNomePipe,
        FiltroPerTipo,
        MatSliderModule,
        PriceFilter
    ],
  styleUrls: ['./lista.component.scss']
})
export default class ListaComponent implements OnInit{
  prodotti : ProductModelRequest[] = [];
  prodotti_search : ProductModelRequest[] = [];
  search_filter : string;
  type_filter : string;
  price_filter : string;
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private userService : UserService, private route : Router, private notificationService: NotificationService) {
      this.search_filter = "";
      this.type_filter = "TIPOLOGIA";
      this.price_filter = "COSTO";
  }

  /*openCart(){
    this.drawer.toggle();
  }*/
    onInputSearchChange(event:any){
        //console.log(event.target.value)
        this.search_filter = event.target.value;
    }

    buyButton(id : number){
        const storedValue = localStorage.getItem('loggato');
        var isLogged = false;
        if (storedValue)  isLogged = JSON.parse(storedValue);

        if(isLogged) this.route.navigate(['/user/dettaglio',id]);
        else{
            this.notificationService.show("Per acquistare un prodotto devi effettuare il login!", 60 * 1000, "error");
            this.route.navigate(['/login']);
        }



    }

  ngOnInit(): void {
    this.userService.getAllProducts().subscribe({
      next: (value) =>{
        this.prodotti = value;
      },
      error: (error) =>{

    }, complete: () =>{

    }
    })
  }



}
