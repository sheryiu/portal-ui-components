import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng';

export const ROUTES: Routes = [
  {
    path: 'mhw',
    loadChildren: () => import('./monster-hunter/monster-hunter.routes').then(r => r.ROUTES),
    data: {
      ...breadcrumb({
        title: 'MHW Database'
      })
    }
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.routes').then(r => r.DOCS_ROUTES),
    data: {
      ...breadcrumb({
        title: 'Documentation'
      })
    }
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.routes').then(r => r.TODO_ROUTES),
    data: {
      ...breadcrumb({
        title: 'To-Do List'
      })
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(r => r.SETTINGS_ROUTES),
    data: {
      ...breadcrumb({
        title: 'Settings'
      })
    }
  }
]