import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',  // Modifica qui: da 'gestionale' a 'login'
        pathMatch: 'full',
      },
      {
        path: 'user',
        loadChildren: () =>
            import('./modules/users/users-routing').then((m) => m.routes),
      },
      {
        path: 'gestionale',
        loadChildren: () =>
          import('./modules/app-layout/app-layout-routing').then((m) => m.routes),
      },
      {
        path: 'prodotti',
        loadChildren: () =>
            import('./modules/prodotti/prodotti-routing').then(
                (m) => m.routes
            ),
      },
      {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login-routing').then((m) => m.routes),
      },
      {
        path: 'workinprogress',
        loadChildren: () =>
            import('./modules/workinprogress/workinprogress').then((m) => m.routes),
      },
      {
        path: 'register',
        loadChildren: () =>
            import('./modules/signup/signup-routing').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
