import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'client',
    loadComponent: () => import('./pages/client/client.component').then(c => c.ClientComponent)
  },
];
