import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserModelDTO} from "../models/user.model";

/** Service per il modulo degli utenti, conterrà al suo interno tutte le funzionalità collegate agli utenti  */
@Injectable({ providedIn: 'root' })
export class UtentiService {

  baseUrl= environment.apiUrl;

  httpOptions = {
    headers : new Headers(
        {"Content-Type": "application/json"}
    )
  }
  /**
   * Il costruttore della classe
   * @param {HttpClient} http Il metodo HTTP utilizzato per la richiesta (GET, POST, PUT, PATCH, DELETE).
   */
  constructor(private http: HttpClient) {}

  /**
   * Il resolver viene utilizzato per effettuare una chiamata prima dell'inizializzazione del costruttore di una componente
   * Questa chiamata parte quindi al cambio della rotta, mantenendo i dati al suo interno
   * @returns {Observable<any>}
   */

  resolveListaUtenti(): Observable<any> | undefined {
    return this.getListaUtenti(15, 0).pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }
  deleteUser(id: number): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}user/delete/?id=${id}`, this.httpOptions);
  }
  readUser(id: number): Observable<any> {
    //console.log(id)
    //return this.http.post<void>(`${this.baseUrl}user/read/?id=${id}`, this.httpOptions);
    return this.http.get<void>(`${this.baseUrl}user/read/?id=${id}`);
  }

  updateUser(user : UserModelDTO): Observable<UserModelDTO> {
    //console.log("in Service: " + user)
    //return this.http.post<void>(`${this.baseUrl}user/read/?id=${id}`, this.httpOptions);
    return this.http.put<UserModelDTO>(this.baseUrl + "user/update", user);
  }
  /**
   * Esegue la get paginata della lista utenti
   * @param {number} pageSize La linghezza della lista che ci verrà tornata
   * @param {number} pageNumber Il numero della pagina che vogliamo visualizzare
   * @param {any} args Un parametro non obbligatorio che ci servirà nel caso in cui dovesse avvenire un filtraggio all'interno della lista
   * @returns {Observable<any>}
   */
  getListaUtenti(
    pageSize: number,
    pageNumber: number,
    ...args: any
  ): Observable<any> {
    let url = `${this.baseUrl}user/getallexceptsuperadmin?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    // Si esegue un forEach degli argomenti ricevuti e ottenendo la chiave valore dell'argomento ricevuto viene inserito all'interno dell'url
    args.forEach((x: any) => {
      if (x) {
        for (const [key, value] of Object.entries(x)) {
          url = url + `&${key}=${value}`;
        }
      }
    });
    return this.http.get<any>(url);
  }
}
