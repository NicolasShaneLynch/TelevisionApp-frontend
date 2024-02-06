import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GENERIC_SUCCESSFUL,
  GENERIC_CONFIRM,
  ICON_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
  RESULT_CONSTANT,
  TABLE_COLUMNS,
} from 'src/app/constants';
import { AngularMaterialModule } from 'src/app/utils';
import { GenericTableComponent } from 'src/app/shared/generic';
import {ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { WorkInProgressComponent } from 'src/app/shared';
import { GenericTableService, LoaderSpinnerService } from 'src/app/services';
import { UtentiService } from 'src/app/services/utenti.service';
import {GenericConfirmModalComponent} from "../../../shared/generic-confirm-modal/generic-confirm-modal.component";
import {DeleteSuccessfulComponent} from "../../../shared/delete-successful/delete-successful.component";
import {GenericHeadCellComponent} from "../../../shared/generic/generic-table/components";
import {
  GenericTableGroupActionsComponent
} from "../../../shared/generic/generic-table/components/generic-table-group-actions/generic-table-group-actions.component";

@Component({
  selector: 'app-lista-utenti',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, GenericTableComponent, GenericHeadCellComponent, GenericTableGroupActionsComponent],
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.scss'],
})
export default class ListaUtentiComponent {
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
  displayedColumns = TABLE_COLUMNS.utenti;
  hasGroupActions!: boolean;
  /** I tipi di celle dell'header */
  cellHeadTypes = {
    select: 'checkbox',
    full_name: 'sort',
    username: 'sort',
    gender: 'sort',
    date: 'sort'
  };
  /** Il valore del sort sulle colonne */
  sortedItems = {
    full_name: false,
    username: false,
    gender: false,
    date: false
  };
  /** La lista degli utenti */
  listaUtenti: any[] = [];

  /**
   * Il costruttore della classe
   * @param { ActivatedRoute } activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   */
  constructor(
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private utentiService: UtentiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * Lifecycle hook dell'onInit
   * Si popola il data source
   * */
  ngOnInit() {
    this.hasGroupActions=true;
    this.changePage();
  }

  /** Recupera i dati dal resolver */
  getDataFromResolver() {
    this.totalElements =
      this.activatedRoute.snapshot.data['listaUtenti'].totalElements;
    this.pageIndex = this.activatedRoute.snapshot.data['listaUtenti'].pageIndex;
    this.listaUtenti = this.activatedRoute.snapshot.data['listaUtenti'];
    if (this.listaUtenti) {
      this.dataSource = new MatTableDataSource<any>(
        this.getMappedDataSource(this.listaUtenti)
      );
    }
  }
  sortCol() {

  }

  changePage(event?: any) {
    // Quando facciamo partire una qualsiasi chiamata facciamo apparire il loaderSpinner per dare un feedback visivo all'utente
    this.loaderSpinnerService.show();
    this.utentiService
      //.getListaUtenti(INPUT_CONSTANT.pageSize, event.number)
        .getListaUtenti(this.size, this.pageIndex)
        .subscribe({
        // Quando ci sottoscriviamo ad una qualsiasi chiamata, bisogna utilizzare le casistiche next ed error per gestire correttamente le funzionalità
        next: (res) => {
          this.totalElements = res.length;
          if (event) this.pageIndex = event.number;
          else this.pageIndex = 0;
          if (res) {
            this.listaUtenti = res;
            this.dataSource = new MatTableDataSource<any>(
              this.getMappedDataSource(this.listaUtenti.slice(this.pageIndex*this.size,(this.pageIndex+1)*this.size))
            );
          }
          // Ricordarsi di aggiungere questa riga di codice ogni volta che si crea una funzione di cambio pagina della tabella, altrimenti si spacca
          this.genericTableService.emitFilteringStatus(false);
          // Nascondere il loader spinner dopo aver effettuato le nostre logiche
          this.loaderSpinnerService.hide();
        },
        // Nascondere sempre il loader spinner nella casistica di errore della chiamata
        error: () => this.loaderSpinnerService.hide(),
      });
  }
  applicaAzioniDiGruppo(event: any) {
    if (event.azione=="Elimina") {
      this.eliminaUtenti(event.selected);
    }
  }
  /** Funzione per mappare i singoli elementi della response */
  getMappedDataSource(toMap: any[]) {
    // Mappiamo il nostro array di oggetti ricevuto dal backend
    return toMap.map((r) => {
      // Creiamo un'array di azioni che l'utente puo effettuare sulla tabella
      const action = [
        {
          // Ogni azione ha bisogno di un titolo
          title: LABEL_CONSTANT.visualizza,
          // Icona
          icon: ICON_CONSTANT.view,
          // Il tipo di bottone, se 'icon' oppure 'button'
          type: 'icon',
          // Una callback, sarà la funzione che partirà sul click dell'azione
          callback: () => this.visualizzaUtente(r.id),
        },
        {
          // Ogni azione ha bisogno di un titolo
          title: LABEL_CONSTANT.modifica,
          // Icona
          icon: ICON_CONSTANT.edit,
          // Il tipo di bottone, se 'icon' oppure 'button'
          type: 'icon',
          // Una callback, sarà la funzione che partirà sul click dell'azione
          callback: () => this.modificaUtente(r.id),
        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: 'icon',
          callback: () => this.eliminaUtente(r.id),
        },
      ];
      // Ritorniamo quindi per ogni elemento all'interno dell'array un nuovo oggetto che avrà come nomi delle variabili i nomi delle colonne
      return {
        full_name: r.userInfoDTO.name+" "+r.userInfoDTO.lastname,
        mail: r.username,
        gender:r.userInfoDTO.genderType.charAt(0) + r.userInfoDTO.genderType.substring(1).toLowerCase(),
        date: new Date(Date.parse(r.userInfoDTO.date)).toLocaleDateString("it-EU"),
        id: r.id,
        select: false,
        username: r.username,
        usertype: r.usertype,
        action: action,
      };
    });
  }

  /**
   * Funzione per la modifica dell'utente, apre la modale di modifica utente
   * @param {number} id L'id dell'utente da modificare
   */
  modificaUtente(id: number) {
    this.router.navigate([`/gestionale/utenti/edituser/`,id], { state: { id: id } });
  }
  visualizzaUtente(id: number) {
    this.router.navigate([`/gestionale/utenti/userview/`,id], { state: { id: id } });
  }
  /**
   * Funzione per l'eliminazione dell'utente, apre la modale di conferma eliminazione
   * @param {number} id L'id dell'utente da eliminare
   */
  eliminaUtente(id: number) {
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title: GENERIC_CONFIRM.cancella_utente, body: GENERIC_CONFIRM.cancella_user, button: "ELIMINA"}
        }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.utentiService.deleteUser(id).subscribe(
            result => {
              const dialogRef = this.dialog.open(
                  DeleteSuccessfulComponent, {
                    width: '660px',
                    height: '300px',
                    disableClose: true,
                    data: {title: GENERIC_SUCCESSFUL.delete_successful, body: GENERIC_SUCCESSFUL.delete_successful2}
                  });
              dialogRef.afterClosed().subscribe(() => {
                location.reload();
              })
            }
        );
      }
    });
  }
  eliminaUtenti(list: any[]) {
    let len = list.length;
    const dialogRef = this.dialog.open(
        GenericConfirmModalComponent,
        {
          width: '660px',
          height: '300px',
          disableClose: true,
          data: {title: (GENERIC_CONFIRM.cancella_utenti1+len+GENERIC_CONFIRM.cancella_utenti2), body: GENERIC_CONFIRM.cancella_users, button: "ELIMINA"}
        }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let n=0;
        for (let i = 0; i < len; i++) {
          this.utentiService.deleteUser(list[i].id).subscribe(
            result => {
            }
          );
        }
        let data = {title:"",body:""};
        if (len!=1) data = {title: GENERIC_SUCCESSFUL.delete_successfulMany, body: GENERIC_SUCCESSFUL.delete_successfulMany2+len+GENERIC_SUCCESSFUL.delete_successfulMany3}
        else data = {title: GENERIC_SUCCESSFUL.delete_successful, body: GENERIC_SUCCESSFUL.delete_successful2}
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
