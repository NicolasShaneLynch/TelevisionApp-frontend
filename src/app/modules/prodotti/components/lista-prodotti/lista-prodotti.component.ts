import {Component} from '@angular/core';
import {CommonModule, UpperCasePipe} from "@angular/common";
import {
  GENERIC_CONFIRM, GENERIC_SUCCESSFUL,
  ICON_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
  RESULT_CONSTANT,
  TABLE_COLUMNS,
} from 'src/app/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {GenericTableService, LoaderSpinnerService} from "../../../../services";
import {ProdottiService} from "../../../../services/prodotti.service";
import {MatTableDataSource} from "@angular/material/table";
import {GenericTableComponent} from "../../../../shared/generic";
import {ChartComponent} from "../../../../shared/chart/chart.component";
import {AngularMaterialModule} from "../../../../utils";
import {GenericHeadCellComponent} from "../../../../shared/generic/generic-table/components";
import {
  GenericTableGroupActionsComponent
} from "../../../../shared/generic/generic-table/components/generic-table-group-actions/generic-table-group-actions.component";
import {GenericConfirmModalComponent} from "../../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {DeleteSuccessfulComponent} from "../../../../shared/delete-successful/delete-successful.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  standalone: true,
  selector: 'app-lista-prodotti',
  templateUrl: './lista-prodotti.component.html',
  imports: [
    GenericTableComponent,
    UpperCasePipe,
    CommonModule,
    ChartComponent,
    AngularMaterialModule,
    GenericTableComponent,
    GenericHeadCellComponent,
    GenericTableGroupActionsComponent
  ],
  styleUrls: ['./lista-prodotti.component.scss']
})
export default class ListaProdottiComponent {

  /** Costante per la label di risultato vuoto della tabella */
  resultConstant = RESULT_CONSTANT;
  /** La grandezza della pagina */
  size = INPUT_CONSTANT.pageSize;
  /** L'indice della pagina attuale della Tabella */
  pageIndex = INPUT_CONSTANT.pageNumber;
  /** Il totale di elementi della tabella */
  totalElements!: number;
  /** Il dataSource della tabella */
  dataSource!: any;
  /** La lista delle colonne da visualizzare */
  displayedColumns = TABLE_COLUMNS.prodotti;
  hasGroupActions!: boolean;
  /** I tipi di celle dell'header */

  cellHeadTypes = {
    select: 'checkbox',
    name: 'sort',
    type: 'sort',
    price: 'sort',
  }
  /** La lista dei prodotti caricata dal metodo resolveListaProdotti()*/
  listaProdotti: any[] = [];

  /** La pagina attuale*/


  constructor(
      private genericTableService: GenericTableService,
      private loaderSpinnerService: LoaderSpinnerService,
      private prodottiService : ProdottiService,
      private activatedRoute: ActivatedRoute,
      private dialog: MatDialog,
      private router: Router
  ) {}
  ngOnInit() : void{
    this.hasGroupActions=true;
    this.changePage();
  }

  changePage(event?: any) {
    this.loaderSpinnerService.show()
    this.prodottiService
        .getListaProdotti(this.size, this.pageIndex)
        .subscribe({
          next: (res) => {
            this.totalElements = res.length;
            if (event) this.pageIndex = event.number;
            else this.pageIndex = 0;
            if (res){
              this.listaProdotti = res;
              this.dataSource = new MatTableDataSource<any>(
                  this.getMappedDataSource(this.listaProdotti.slice(this.pageIndex*this.size,(this.pageIndex+1)*this.size))
              )
            }
            this.genericTableService.emitFilteringStatus(false)
            this.loaderSpinnerService.hide()
          },
          error: () => this.loaderSpinnerService.hide(),
        });
  }
  getDataFromResolver(): void {
    this.totalElements = this.activatedRoute.snapshot.data['listaProdotti'].totalElements;
    this.pageIndex = this.activatedRoute.snapshot.data['listaProdotti'].pageIndex;
    this.listaProdotti = this.activatedRoute.snapshot.data['listaProdotti'];
    console.log(JSON.stringify(this.listaProdotti))
    if (this.listaProdotti){
      this.dataSource = new MatTableDataSource<any>(
          this.getMappedDataSource(this.listaProdotti)
      );
    }
  }
  getMappedDataSource(toMap: any[]){
    return toMap.map((r) => {
      const action = [
        {
          title: LABEL_CONSTANT.visualizza,
          icon: ICON_CONSTANT.view,
          type: 'icon',
          callback: () => this.visualizzaProdotto(r.id)
        },
        {
          title: LABEL_CONSTANT.modifica,
          icon: ICON_CONSTANT.edit,
          type: 'icon',

          callback: () => this.modificaProdotto(r.id)

        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: 'icon',
          callback: () => this.eliminaProdotto(r.id)

        },
      ];
      return {
        id: r.id,
        name: r.name,
        type : r.type,
        price: "€ " + r.price.toFixed(2),
        action: action
      };
    });
  }
  applicaAzioniDiGruppo(event: any) {
    if (event.azione=="Elimina") {
      this.eliminaProdotti(event.selected);
    }
  }
  modificaProdotto(id: number): void{
    localStorage.setItem("productID", String(id))
    this.router.navigate([`/gestionale/prodotti/modifica-prodotto`])
  }
  eliminaProdotto(id: number): void {
    this.prodottiService.deleteProdotto(id)
        .subscribe(result => {
          location.reload()
        })

    console.log(`elimina prodotto ${id}`)
  }
  visualizzaProdotto(id: number) {
    localStorage.setItem("productID", String(id))
    this.router.navigate([`/gestionale/prodotti/dettaglio-prodotto`])
  }
  eliminaProdotti(list: any[]) {
    let len = list.length;
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title: (GENERIC_CONFIRM.cancella_utenti1+len+GENERIC_CONFIRM.cancella_prodotti2), body: GENERIC_CONFIRM.cancella_prodotti, button: "ELIMINA"}
        }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let n=0;
        for (let i = 0; i < len; i++) {
          this.prodottiService.deleteProdotto(list[i].id).subscribe(
              result => {
              }
          );
        }
        let data = {title:"",body:""};
        if (len!=1) data = {title: GENERIC_SUCCESSFUL.delete_successfulManyProdotti, body: GENERIC_SUCCESSFUL.delete_successfulMany2+len+GENERIC_SUCCESSFUL.delete_successfulManyProdotti3}
        else data = {title: GENERIC_SUCCESSFUL.product_delete_successful, body: GENERIC_SUCCESSFUL.product_delete_successful2}
        const dialogRef = this.dialog.open(
            DeleteSuccessfulComponent, {
              width: '660px',
              height: '300px',
              disableClose: true,
              data:data
            });
        dialogRef.afterClosed().subscribe(() => {
          location.reload();
        })
      }
    });
  }
}


