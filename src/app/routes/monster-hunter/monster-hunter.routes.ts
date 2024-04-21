import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    children: [
      {
        path: 'armor',
        loadChildren: () => import('./armor/armor.routes').then(r => r.ROUTES),
      },
      {
        path: 'armor-set',
        loadChildren: () => import('./armor-set/armor-set.routes').then(r => r.ROUTES),
      },
      {
        path: 'armor-set-bonus',
        loadChildren: () => import('./armor-set-bonus/armor-set-bonus.routes').then(r => r.ROUTES),
      },
      {
        path: 'skill',
        loadChildren: () => import('./skill/skill.routes').then(r => r.ROUTES),
      }
    ]
  }
]