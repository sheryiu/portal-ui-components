import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () => import('./routes/inventory/routes').then(r => r.ROUTES),
  },
  {
    path: 'user',
    loadChildren: () => import('./routes/user/routes').then(r => r.ROUTES),
  }
];
