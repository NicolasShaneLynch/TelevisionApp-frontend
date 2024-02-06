import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {ProdottiService} from "../../services/prodotti.service";

export const routes: Routes = [
    {
        path: '',
        title: 'MyProfile',
        loadComponent: () => import('./components/myprofile-layout/myprofile-layout.component'),

        children: [
            {
                path: '',
                redirectTo: 'lista',
                pathMatch: 'full',
            },
            {
                path: 'lista',
                title: 'lista ordini',
                loadComponent: () => import('./components/lista-ordini/lista-ordini.component'),
                resolve: {
                    listaProdotti: () => inject(ProdottiService).resolveListaProdotti(),
                }
            },
            {
                path: 'read-ordine/:id',
                title: 'leggi ordine',
                loadComponent: () => import('./components/read-ordine/read-ordine.component')
            },

        ],
    },{
        path: 'modify',
        title: 'ModifyProfile',
        loadComponent: () => import('./components/modify/modify.component')
    }
];
