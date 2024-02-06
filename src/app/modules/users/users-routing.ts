import { Routes } from '@angular/router';
import {Inject, inject} from "@angular/core";
import {UtentiService} from "../../services/utenti.service";
import {ProdottiService} from "../../services/prodotti.service";


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../user-layout/components/user-layout/user-layout.component'), // Per utilizzare correttamente il lazy loading per il caricamento delle componenti ( Quindi utilizzando il loadComponent )
        // Bisogna ricordarsi di impostare la componente come default ( Vedere la componente loginComponent, nella dichiarazione della classe )
        children: [
            {
                path: 'lista',
                title: 'Lista', // Il title viene utilizzato per mostrare su broswer la pagina in cui siamo,
                // Se guardiamo la sezione delle pagine ( Sopra la barra di ricerca dell'url ) vedremo che ci sarà scritto "Formazione - Login"
                loadComponent: () => import('./components/lista/lista.component'),
            },
            {
                path: 'dettaglio/:id',
                title: 'Dettaglio', // Il title viene utilizzato per mostrare su broswer la pagina in cui siamo,
                // Se guardiamo la sezione delle pagine ( Sopra la barra di ricerca dell'url ) vedremo che ci sarà scritto "Formazione - Login"
                loadComponent: () => import('./components/dettaglio/dettaglio.component'),
            },
            {
                path: 'acquisto/:id',
                title: 'Acquisto', // Il title viene utilizzato per mostrare su broswer la pagina in cui siamo,
                // Se guardiamo la sezione delle pagine ( Sopra la barra di ricerca dell'url ) vedremo che ci sarà scritto "Formazione - Login"
                loadComponent: () => import('./components/acquisto/acquisto.component'),
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./../myprofile/myprofile.route').then((m) => m.routes),
            }
        ],
    },
];
