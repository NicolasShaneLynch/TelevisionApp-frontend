/** Interfaccia per la richiesta di login */
export interface LoginModelRequest {
  /** Email dell'utente */
  username: string;
  /** Password dell'utente */
  password: string;
  /** Se l'utente deve rimanere loggato oppure no */
  rememberMe: boolean;
}

/** Interfaccia per la risposta della richiesta di login */
export interface LoginModelResponse {
  id:number;
  /** Il tipo di utente */
  usertype: string;
  /** Il nome dell'utente */
  username: string;

  userInfoDTO : object;

}

/** Interfaccia per il nominativo utente */
export interface SessioneUtenteModel {
  /** Lo username dell'utente */
  username: string;
  /** Il tipo di utente */
  usertype: string;
}

