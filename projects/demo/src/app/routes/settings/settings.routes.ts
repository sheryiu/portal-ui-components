import { Routes } from '@angular/router';
import { layeredContainer } from 'portal-ui-ng';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./settings.component').then(c => c.SettingsComponent),
    data: {
      ...layeredContainer('full'),
    }
  }
]