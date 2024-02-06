/** Costante per il menù di navigazione laterale */
export const SIDENAV_MENU_CONSTANT_SUPER = [
  {
    name: 'Utenti',
    icon: 'group',
    childrenPath: [
      '/gestionale/utenti/lista'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti gli utenti',
        path: '/gestionale/utenti/lista',
      },
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Aggiungi utente',
        path: '/gestionale/utenti/insertuser',
      }
    ]
  },
  {
    wip: false,
    name: 'Il tuo profilo',
    icon: 'person',
    childrenPath: [
      '/gestionale/myprofileadmin/myprofileview'
    ],
    children: [
      {
        wip: false,
        name: 'Il tuo Profilo',
        path: '/gestionale/myprofileadmin/myprofileview'
      },
      {
        wip: false,
        name: 'Modifica Profilo',
        path: '/gestionale/myprofileadmin/editmyprofile',
      }
    ]
  },
]
export const SIDENAV_MENU_CONSTANT_ADMIN = [
  {
    name: 'Prodotti',
    icon: 'filter',
    childrenPath: [
      '/gestionale/prodotti/lista'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti i prodotti',
        path: '/gestionale/prodotti/lista',
      },
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Aggiungi prodotto',
        path: '/gestionale/prodotti/crea-prodotto',
      }
    ],
  },
  {
    wip: false,
    name: 'Il tuo profilo',
    icon: 'person',
    childrenPath: [
      '/gestionale/myprofile/myprofileview'
    ],
    children: [
      {
        wip: false,
        name: 'Il tuo Profilo',
        path: '/gestionale/myprofileadmin/myprofileview'
      },
      {
        wip: false,
        name: 'Modifica Profilo',
        path: '/gestionale/myprofileadmin/editmyprofile',
      },
      {
        wip: false,
        name: 'Modifica Azienda',
        path: '/gestionale/myprofileadmin/editfactory',
      }
    ]
  },
]
