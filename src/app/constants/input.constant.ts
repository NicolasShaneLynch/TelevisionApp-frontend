/** Costante con i testi da usare negli input */
export const INPUT_CONSTANT = {
  nome: 'Nome',
  cognome: 'Cognome',
  dataNascita: 'Data di nascita',
  luogoNascita: 'Luogo di nascita',
  email: 'Email',
  telefono: 'Telefono',
  note: 'Note',
  password: 'Password',
  elimina: 'Elimina',
  azioni_di_gruppo: 'Azioni di gruppo',
  ruolo: 'Ruolo',
  nome_cognome: 'Nome o Cognome',
  stato: 'Stato',
  ricerca: 'Ricerca',
  pageNumber: 0,
  pageSize: 15,
  tags: 'Tags',
  tag: 'Tag',
  descrizione: 'Descrizione',
  data_inizio: 'Data inizio',
  data_fine: 'Data fine',
  nome_e_cognome: 'Nome e cognome',
  email_recupero: 'Email di recupero',
  campi_obbligatori: '* Campi obbligatori',
  quantita: 'Quantità',
  prezzo: 0
};

/** Costante con i testi da usare negli input di una tabella*/
export const TABLE_INPUT_CONSTANT = {
  name: 'Nome',
  type: 'Tipologia',
  price: 'Prezzo',
  full_name: 'NOME COMPLETO',
  username: 'MAIL',
  gender: 'GENERE',
  date: 'DATA CREAZIONE',
  usertype: 'Ruolo',
  id: 'ID',
  id_ordine: 'ID ORDINE',
  data_ordine: 'DATA ORDINE',
  cost: 'COSTO'
};


/** Costante con i testi da usare nella select della azioni di gruppo */
export const TABLE_GROUP_ACTIONS_CONSTANT = [
  {
    icon: 'delete',
    value: 'Elimina',
  },
];

export const TABLE_COLUMNS = {
  prodotti: ['select','name', 'type', 'price', 'action'],
  utenti: ['select', 'full_name', 'username', 'gender', 'date', 'action'],
  storico_ordini: ['id_ordine', 'data_ordine', 'cost', 'action']
};
