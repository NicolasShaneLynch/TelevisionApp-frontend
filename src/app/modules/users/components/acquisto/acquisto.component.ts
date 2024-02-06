import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import NavbarComponent from "../../../user-layout/components/navbar/navbar.component";
import {MatDividerModule} from "@angular/material/divider";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {OrderModelResponse} from "../../../../models/order.model";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    NavbarComponent,
    MatDividerModule
  ],
  styleUrls: ['./acquisto.component.scss']
})
export default class AcquistoComponent implements OnInit{
  dettaglio : OrderModelResponse = {id: 0, products: []};
  orderTotal = 0;
  constructor(private activatedRoute : ActivatedRoute,
              private orderService : OrderService,
              private router : Router) {
  }
  ngOnInit(): void {
    //qui si legge l'id dalla route e fa una chiamata rest
    //per popolare, tramite data binding, gli attributi della view
    //in questo modo rendiamo il codice meno
    var param_id:number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.orderService.readOrder(param_id).subscribe({
      next:(val)=>{
        this.dettaglio = val;
        console.log(this.dettaglio.products)
        this.dettaglio.products.forEach((val)=>{
          this.orderTotal+=Number(val.price);
        });
      },
      error: (err)=>{
        this.router.navigate(['/user/lista']);
      }
    });
  }

}
