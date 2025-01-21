import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(c => c.HomeComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home-content/home-content.component').then(c => c.HomeContentComponent)
      }
    ]
  }
]