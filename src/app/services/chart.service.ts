import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ProdottiService} from "./prodotti.service";


@Injectable({providedIn: 'root'})
export class ChartService {

    baseUrl: string = environment.apiUrl;
    userSession = localStorage.getItem("userSession")


    constructor(
        private productService: ProdottiService) {
    }

    getProductStatistics(id: number, date: string) {
        console.log("getProductStatistics " + this.productService.getProductStatistic(id, date))
        return this.productService.getProductStatistic(id, date)
    }

    getAllProductByIdFactory(id: string) {
        return this.productService.getAllByIdFactory(Number(id))
    }

    loadData(labels: string[]) {
        var res : number[] = Array.from({ length: labels.length }, () => 0);
        if (this.userSession) {
            this.getAllProductByIdFactory(JSON.parse(this.userSession).idFactory).forEach(
                value => {
                    //console.log(value)
                    value.forEach((product : any) => {
                        let data : number[] = []
                        console.log(product.id)
                        labels.forEach((date) => {
                            this.getProductStatistics(product.id, date).subscribe({
                                next : (resStats)=>{
                                    console.log(resStats)
                                    data.push(resStats.numberOfOrders)
                                },complete:()=>{
                                    for(var i = 0; i<res.length;i++){
                                        if(isNaN(res[i])){
                                            res[i]=data[i];
                                        }else res[i]+=data[i];
                                    }
                                }
                            });
                            console.log("res"+res)
                        });


                    })
                    /*labels.forEach((label) => {
                        console.log("id-labels " + value[0].id + " " + label)
                        this.getProductStatistics(value[0].id, label).subscribe(
                            value1 => {
                                data.push(value1.numberofOrders)
                            }
                        )
                    });*/
                });
            console.log(res)
            return res
        }
        else{ return res}
    }


}