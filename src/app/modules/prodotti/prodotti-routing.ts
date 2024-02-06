import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {ProdottiService} from "../../services/prodotti.service";

export const routes: Routes = [
    {
        path: '',
        title: 'Prodotti',
        loadComponent: () => import('./components/prodotti/prodotti.component'),

        children: [
            {
                path: '',
                redirectTo: 'lista',
                pathMatch: 'full',
            },
            {
                path: 'lista',
                title: 'Tutti i Prodotti',
                loadComponent: () => import('./components/lista-prodotti/lista-prodotti.component'),
                resolve: {
                    listaProdotti: () => inject(ProdottiService).resolveListaProdotti(),
                }
            },
            {
                path: 'crea-prodotto',
                title: 'Inserisci Prodotto',
                loadComponent: () => import('./components/crea-prodotto/crea-prodotto.component')
            },
            {

                path: 'modifica-prodotto',
                title: 'Modifica Prodotto',
                loadComponent: () => import('./components/modifica-prodotto/modifica-prodotto.component')
            },
            {

                path: 'dettaglio-prodotto',
                title: 'Dettaglio Prodotto',
                loadComponent: () => import('./components/dettaglio-prodotto/dettaglio-prodotto.component')
            },

        ],
    },
];
