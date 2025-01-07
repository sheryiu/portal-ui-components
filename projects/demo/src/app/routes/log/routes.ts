import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'system-log',
    loadChildren: () => import('./system-log/system-log.routes').then(r => r.ROUTES)
  }
]