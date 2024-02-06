import {Component, OnInit} from '@angular/core';
import {GenericTableComponent} from "../../../../shared/generic";
import {CommonModule, DatePipe, NgIf, UpperCasePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {ICON_CONSTANT, LABEL_CONSTANT, TABLE_COLUMNS} from "../../../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {ProductModelResponse} from "../../../../models";

@Component({
    standalone: true,
    selector: 'app-lista-ordini',
    templateUrl: './lista-ordini.component.html',
    imports: [
        CommonModule,
        GenericTableComponent,
        NgIf,
        UpperCasePipe
    ],
    styleUrls: ['./lista-ordini.component.scss']
})
export default class ListaOrdiniComponent implements OnInit{
    totalElements: any;
    pageIndex: any;
    dataSource!: any;
    size:any;
    displayedColumns:any = TABLE_COLUMNS.storico_ordini;
    cellHeadTypes:any =  {
        id_ordine: 'sort',
        data_ordine: 'sort',
        cost: 'sort',
    };
    private listaOrdini: any;
    constructor(private activatedRoute : ActivatedRoute,
                private route : Router,
                private orderService : OrderService) {

    }
    ngOnInit(): void {
        this.pageIndex = 0;
        this.totalElements = 1;
        //this.listaProdotti = [{id_ordine: 1, data_ordine: "ciao", cost: 20}]
        let userJSON = localStorage.getItem("userSession");
        if(userJSON){
            var object= JSON.parse(userJSON);
            var id = object.id;

        }
        this.orderService.getOrdersByUserId(id).subscribe({
            next : (res)=>{
                console.log(res)
                this.listaOrdini = res;
                if (this.listaOrdini){
                    console.log("inizializzando il datasource");
                    this.dataSource = new MatTableDataSource<any>(
                        this.getMappedDataSource(this.listaOrdini)
                    );
                }
            }
        })





    }

    changePage(e:any){

    }

    getDataFromResolver(): void {
        this.totalElements = this.activatedRoute.snapshot.data['listaProdotti'].totalElements;
        this.pageIndex = this.activatedRoute.snapshot.data['listaProdotti'].pageIndex;
        /*this.listaProdotti = this.activatedRoute.snapshot.data['listaProdotti'];
        console.log(JSON.stringify(this.listaProdotti))
        if (this.listaProdotti){
            this.dataSource = new MatTableDataSource<any>(
                this.getMappedDataSource(this.listaProdotti)
            );
        }*/
    }

    getMappedDataSource(toMap: any[]){
        return toMap.map((r) => {
            const action = [
                {
                    title: LABEL_CONSTANT.visualizza,
                    icon: ICON_CONSTANT.view,
                    type: 'icon',

                    callback: () => {
                        //this.modificaProdotto(r.id)
                        //console.log("click");
                        this.route.navigate(['/user/profile/read-ordine/'+r.id]);

                    }

                },
            ];
            return {
                id_ordine: r.id,
                data_ordine: new DatePipe('it-IT').transform(r.date, 'dd/MM/yyyy'),
                cost: "€ " + r.products.reduce((acc:number, product:ProductModelResponse) => {
                    return acc + product.price;
                }, 0),
                action: action
            };
        });
    }
}
