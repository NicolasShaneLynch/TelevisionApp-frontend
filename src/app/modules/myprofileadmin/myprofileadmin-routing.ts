import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

export const routes: Routes = [
    {
        path: '',
        title: 'MyProfileAdmin',
        loadComponent: () => import('./myprofile/myprofile.component'), // Viene caricata inizialmente una componente contenente soltanto il router outlet,
                                                                  // Che farà da recipiente a tutte le altre componenti che verrano caricate tramite rotta
        children: [
            {
                path: '',
                redirectTo: 'myprofileview',
                pathMatch: 'full',
            },
            {
                path: 'myprofileview',
                title: 'Il tuo profilo',
                loadComponent: () => import('./visualizza-profilo/visualizza-profilo.component')
            },
            {
                path: 'editmyprofile',
                title: 'Modifica Profilo',
                loadComponent: () => import('./modifica-profilo/modifica-profilo.component')
            },
            {
                path: 'editfactory',
                title: 'Modifica Azienda',
                loadComponent: () => import('./modifica-factory/modifica-factory.component')
            },
        ],
    },
];

