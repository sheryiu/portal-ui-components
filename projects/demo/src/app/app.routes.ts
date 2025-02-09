import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () => import('./routes/inventory/routes').then(r => r.ROUTES),
  },
  {
    path: 'user',
    loadChildren: () => import('./routes/user/routes').then(r => r.ROUTES),
  },
  {
    path: 'log',
    loadChildren: () => import('./routes/log/routes').then(r => r.ROUTES)
  },
  {
    path: 'media',
    loadChildren: () => import('./routes/media/routes').then(r => r.ROUTES)
  },
  {
    path: 'docs',
    loadChildren: () => import('./routes/docs/routes').then(r => r.ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./routes/home/routes').then(r => r.ROUTES)
  },
];
