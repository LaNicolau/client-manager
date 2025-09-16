import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { loginGuard } from './guards/login/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'client',
    loadComponent: () =>
      import('./pages/client/client.component').then((c) => c.ClientComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
