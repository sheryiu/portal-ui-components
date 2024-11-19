import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'User' }),
    },
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./customer.routes').then(r => r.ROUTES),
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee.routes').then(r => r.ROUTES),
      },
    ]
  }
]