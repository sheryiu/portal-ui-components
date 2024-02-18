import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'armor',
    loadChildren: () => import('./armor/armor.routes').then(r => r.ROUTES),
  },
  {
    path: 'armor-set',
    loadChildren: () => import('./armor-set/armor-set.routes').then(r => r.ROUTES),
  },
]