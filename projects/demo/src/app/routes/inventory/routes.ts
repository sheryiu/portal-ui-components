import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Inventory' }),
    },
    children: [
      {
        path: 'item',
        loadChildren: () => import('./item/inventory-item.routes').then(r => r.ROUTES),
      },
      {
        path: 'shelf',
        loadChildren: () => import('./shelf/inventory-shelf.routes').then(r => r.ROUTES),
      },
    ]
  }
]