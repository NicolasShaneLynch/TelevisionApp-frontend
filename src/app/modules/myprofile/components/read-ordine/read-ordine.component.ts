import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {OrderModelDTO} from "../../../../models/order.model";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
@Component({
    standalone: true,
    selector: 'app-read-ordine',
    templateUrl: './read-ordine.component.html',
    imports: [
        CommonModule,
        MatIconModule,
        MatDividerModule
    ],
    styleUrls: ['./read-ordine.component.scss']
})
export default class ReadOrdineComponent implements OnInit{
  ordine_id! : number;
  order : OrderModelDTO = {id: 0, products: [], user_id: 0, date:""};
  constructor(private location : Location,
              private activatedRoute : ActivatedRoute,
              private orderService : OrderService) {

  }



  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.ordine_id = id;
    this.orderService.readOrder(this.ordine_id).subscribe({
      next:(res)=>{
        console.log(res);
        this.order = res;
      }
    })
  }
}
