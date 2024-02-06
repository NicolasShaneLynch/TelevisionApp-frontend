import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/app-layout/app-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'utenti',
        pathMatch: 'full',
      },
      {
        path: 'utenti',
        loadChildren: () =>
            import('../utenti/utenti-routing').then((m) => m.routes),
      },
      {
        path: 'prodotti',
        loadChildren: () =>
            import('../prodotti/prodotti-routing').then((m) => m.routes),
      },
      {
        path: 'myprofileadmin',
        loadChildren: () =>
            import('../myprofileadmin/myprofileadmin-routing').then((m) => m.routes),
      },
      { path: '**', redirectTo: 'utenti', pathMatch: 'full' },
    ],
  },
];
