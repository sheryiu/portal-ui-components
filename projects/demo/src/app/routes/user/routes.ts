import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'User' }),
    },
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.routes').then(r => r.ROUTES),
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.routes').then(r => r.ROUTES),
      },
      {
        path: 'access-control',
        loadChildren: () => import('./access-control/access-control.routes').then(r => r.ROUTES),
      },
      {
        path: 'employee-calendar',
        loadChildren: () => import('./employee-calendar/employee-calendar.routes').then(r => r.ROUTES),
      },
      {
        path: 'salary',
        loadChildren: () => import('./salary/salary.routes').then(r => r.ROUTES),
      }
    ]
  }
]