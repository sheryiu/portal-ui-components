import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Inventory' }),
    },
    children: [
      {
        path: 'item',
        loadChildren: () => import('./inventory-item.routes').then(r => r.ROUTES),
      },
      {
        path: 'shelf',
        loadChildren: () => import('./inventory-shelf.routes').then(r => r.ROUTES),
      },
    ]
  }
]