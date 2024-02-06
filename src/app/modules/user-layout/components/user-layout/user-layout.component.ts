import {Component, ViewChild} from '@angular/core';
import {ProductModelResponse, ProductModelRequest} from "../../../../models/product.model";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {UserService} from "../../../../services/user.service";
import NavbarComponent from "../navbar/navbar.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {CartCommunicationService, NotificationService} from "../../../../services";
import {NgForOf} from "@angular/common";
import {OrderService} from "../../../../services/order.service";
import {iterator} from "rxjs/internal/symbol/iterator";
import {OrderModelRequest} from "../../../../models/order.model";

@Component({
  standalone: true,
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  imports: [
    NavbarComponent,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    RouterOutlet,
    NgForOf
  ],
  styleUrls: ['./user-layout.component.scss']
})
export default class UserLayoutComponent {
  prodotti : ProductModelRequest[] = [];
  cartProductsMap: Map<number, ProductModelRequest> = new Map();
  //cartProducts : ProductModelRequest[] = [];
  cartTotal : number = 0;
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private userService : UserService,
              private route : Router,
              private cartCommunicationService : CartCommunicationService,
              private orderService : OrderService,
              private notificationService : NotificationService) {
  }

  cartButtonContinueNavigation(){
    this.drawer.opened = false;
    this.route.navigate(['/user/lista']);
  }
  cartButtonConfirmOrder(){
    this.drawer.opened = false;
    var products : ProductModelRequest[] = [];
    this.cartProductsMap.forEach((value) => {
      //var p : ProductModelRequest = {description: "", id: 0, id_factory: 0, name: "", price: 0, type: ""};
      products.push(value);
    });
    if(this.cartProductsMap.size > 0) {
      var userSession = localStorage.getItem('userSession');
      if (userSession) {
        var json = JSON.parse(userSession);
        var id = json.id;
      }
      //let user_id =
      var orderModelRequest: OrderModelRequest = {id: 0, products: products};

      this.orderService.insertOrder(id, orderModelRequest).subscribe({
        next: (value) => {
          console.log(value);
          this.cartProductsMap.clear();
          this.route.navigate(['/user/acquisto/' + value.id]);
          this.cartTotal = 0;
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
        }

      })
    }else{
      //this.drawer.toggle()
      this.notificationService.show("Carrello vuoto!", 2500, "error");

    }

    //this.route.navigate(['/user/acquisto']);
  }
  openCart(){
    console.log("toggling drawer");
    this.drawer.toggle();
  }

  deleteItemCart(id : number){
    if(this.cartProductsMap.has(id)) {
      this.cartTotal -= Number(this.cartProductsMap.get(id)!.price);
      this.cartProductsMap.delete(id);
      this.saveCartMapToLocalStorage();
    }
  }

  private saveCartMapToLocalStorage(){
    const mapArray = Array.from(this.cartProductsMap.entries());
    const jsonString = JSON.stringify(mapArray);
    localStorage.setItem("cart", jsonString);
  }

  ngOnInit(): void {
    let jsonString = localStorage.getItem("cart");
    const parsedArray = JSON.parse(jsonString!);
    this.cartProductsMap = new Map(parsedArray);
    for(let p of Array.from(this.cartProductsMap.values())){
      this.cartTotal+=Number(p.price);
    }

    this.cartCommunicationService.addToCart.subscribe({
      next: (product) =>{
        if(!this.cartProductsMap.has(product.id)){
          this.cartProductsMap.set(product.id, product);
          //this.cartProducts.push(product)
          console.log("id to add to cart: " + product);
          this.cartTotal+=product.price;
          this.saveCartMapToLocalStorage();
        }
        this.drawer.toggle();
      },
      error: (error) =>{

      }, complete: () =>{

      }
    })



    this.userService.getAllProducts().subscribe({
      next: (value) =>{
        this.prodotti = value;
      },
      error: (error) =>{

      }, complete: () =>{

      }
    })
  }



  protected readonly Array = Array;
}
