/**
 * Oggetto con chiave-valore uguale un path come chiave e valore oggetto di tipo { title: title, subtitle: subtile}
 * Costante in cui sono presenti i testi dei titoli
 */
export const TITLE_CONSTANT = {
  gestione_profilo: 'Gestione Profilo',
  profilo: 'Profilo',
  modifica_profilo: 'Modifica profilo',
};
/**
 * Oggetto con chiave-valore uguale un path come chiave e valore oggetto di tipo { title: title, subtitle: subtile}
 * Costante in cui sono presenti in base al path in cui si è i valori del titolo e il sottotitolo da mostrare nella sezione del sub header
 */
export const DASHBOARD_HEADER = {
  '/gestionale/utenti/lista': {
    title: 'Tutti gli utenti',
    pageLabel: 'Utenti/',
    positionLabel: 'Tutti gli utenti'
  },
    '/gestionale/utenti/userview/*': {
    title: 'Dettaglio utente',
    pageLabel: 'Utenti/Tutti gli utenti/',
    positionLabel : 'Dettaglio utente'
  },
  '/gestionale/utenti/insertuser': {
    title: 'Aggiungi utente',
    pageLabel: 'Utenti/Tutti gli utenti/',
    positionLabel : ' Aggiungi utente'
  },
  '/gestionale/utenti/edituser/*': {
    title: 'Modifica utente',
    pageLabel: 'Utenti/Tutti gli utenti/',
    positionLabel : ' Modifica utente'
  },
  '/gestionale/utenti/editfactory/*': {
    title: 'Modifica azienda',
    pageLabel: 'Utenti/Tutti gli utenti/',
    positionLabel : ' Modifica azienda'
  },

  '/gestionale/prodotti/lista': {
    title: 'Tutti i prodotti',
    pageLabel: 'Prodotti/',
    positionLabel : 'Tutti i prodotti'
  },
  '/gestionale/prodotti/crea-prodotto': {
    title: 'Aggiungi prodotto',
    pageLabel: 'Prodotti/Tutti i prodotti/',
    positionLabel : 'Aggiungi prodotto'
  },
  '/gestionale/prodotti/modifica-prodotto': {
    title: 'Modifica Prodotto',
    pageLabel: 'Prodotti/Tutti i prodotti/',
    positionLabel : 'Modifica Prodotto'
  },
  '/gestionale/prodotti/dettaglio-prodotto': {
    title: 'Dettaglio Prodotto',
    pageLabel: 'Prodotti/Tutti i prodotti/',
    positionLabel : 'Dettaglio'
  },

  '/gestionale/utenti/userview': {
    title: 'Dettaglio utente',
    pageLabel: 'Utenti/Tutti gli utenti/',
    positionLabel : 'Dettaglio utente'
  },
  '/gestionale/myprofileadmin/myprofileview': {
    title: 'Il tuo Profilo',
    pageLabel: '',
    positionLabel : 'Il tuo Profilo'
  },
  '/gestionale/myprofileadmin/editmyprofile': {
    title: 'Modifica Profilo',
    pageLabel: 'Il tuo Profilo/',
    positionLabel : 'Modifica Profilo'
  },
  '/gestionale/myprofileadmin/editfactory': {
    title: 'Modifica Azienda',
    pageLabel: 'Il tuo Profilo/',
    positionLabel : 'Modifica Azienda'
  },
};
