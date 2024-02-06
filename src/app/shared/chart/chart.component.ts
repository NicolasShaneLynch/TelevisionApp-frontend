import {Component} from '@angular/core';
import {Chart} from "chart.js/auto";
import {AngularMaterialModule} from "../../utils";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartService} from "../../services/chart.service";
import {ProdottiService} from "../../services/prodotti.service";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;


@Component({
    standalone: true,
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    imports: [
        AngularMaterialModule,
        NgForOf,
        FormsModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

    public currentYear = new Date().getFullYear()
    public chart: any;
    public monthsAbbreviated: string[] = [
        "Gen",
        "Feb",
        "Mar",
        "Apr",
        "Mag",
        "Giu",
        "Lug",
        "Ago",
        "Set",
        "Ott",
        "Nov",
        "Dic"
    ];
    public selectedMonth: number = 0;

    constructor(private chartservice: ChartService,
                private productService : ProdottiService) {
    }

    ngOnInit() {
        this.createChart()
    }

    createChart() {
        this.initChart(
            this.getLabels(1),
            "Scegli un mese da selezionare", // da inserire dopo
            [],
            'blue'
        )
    }

    updateChart(){
        //let newData = this.getData()
        let newLabels = this.getLabels(this.selectedMonth)
        //set label
        console.log("new labels")
        console.log(newLabels)
        //console.log(this.chart.data.labels)
        //console.log(this.chart.data.labels)
        //this.chart.data.labels = []
        //this.chart.data.labels.pop()
        //this.chart.data.labels.push(this.getLabels(this.selectedMonth))
        //pop datasets
        /*this.chart.data.labels.forEach((dataset:any) => {
            dataset.data.labels.pop();

        });*/
        this.chart.data.labels = newLabels
        var res : number[] = Array.from({ length: newLabels.length }, () => 0);
        this.chartservice.getAllProductByIdFactory(JSON.parse(localStorage.getItem("userSession")!).idFactory).subscribe({next:(value => {
                value.forEach((product : any) => {
                    let data : number[] = []
                    //console.log(product.id)
                    newLabels.forEach((date,index) => {
                        this.productService.getProductStatistic(product.id, date).subscribe({
                            next : (resStats)=>{
                                //console.log(resStats)
                                if(isNaN(res[index])){
                                    res[index] =resStats.numberOfOrders
                                }else res[index] +=resStats.numberOfOrders
                                //data.push(resStats.numberOfOrders)
                                console.log(resStats.numberOfOrders)
                            },complete:()=>{
                                /*for(var i = 0; i<res.length;i++){
                                    if(isNaN(res[i])){
                                        res[i]=data[i];
                                    }else res[i]+=data[i];
                                }
                                console.log(res)*/
                                this.chart.destroy()
                                this.initChart(
                                    newLabels,
                                    "Prodotti", // da inserire dopo
                                    res,
                                    'black'
                                )

                               /* console.log(this.chart)
                                this.chart.data.datasets=[]

                                this.chart.data.dataset[0].data = res;

                                this.chart.update()*/
                            }
                        });

                    });


                })

            }), complete : ()=>{
                //console.log("res"+res)
            }
        })







        /*this.chart.data.datasets.forEach((dataset:any) => {
            dataset.data.dataset.pop();
        });
        //update datasets
        this.chart.data.datasets.forEach((dataset:any) => {
            dataset.data.labels.push(newData);
        });*/



    }

    initChart(labels: string[], label: string, data: number[], backgroundColor: string) {
        this.chart = new Chart("MyChart", {
            type: 'line', //this denotes tha type of chart
            data: {// values on X-Axis
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        backgroundColor: backgroundColor
                    },
                ]
            },
            options: {
                aspectRatio: 4
            }
        });
    }

    onSelect(month: string) {
        if (month !== null) {
            //convert month string to index
            this.selectedMonth = this.monthsAbbreviated.indexOf(month) + 1
            //call updateChart() function for chart data update
            this.updateChart()

        }

    }

    getNumberOfDaysInMonth(month: number): number {
        // The month parameter in the Date object is 0-indexed (0 = January, 11 = December)
        // So, we subtract 1 from the provided month.
        const lastDayOfMonth = new Date(this.currentYear, month, 0);

        // The Date object automatically adjusts the day to the last day of the previous month,
        // so we can directly get the day of the month to get the last day of the target month.
        return lastDayOfMonth.getDate();
    }

    getLabels(month: number){
        const numberOfDaysInMonth = this.getNumberOfDaysInMonth(month);
        const datesArray: string[] = [];
        for (let day = 1; day <= numberOfDaysInMonth; day++) {
            const date: string = `${this.currentYear}-${month}-${day}`;
            datesArray.push(date);
        }

        return datesArray;
    }

    getData(){
        return this.chartservice.loadData(this.getLabels(this.selectedMonth))
    }

    getStatsByDate(date : string){
        return this.chartservice.loadData(this.getLabels(this.selectedMonth))
    }
}
