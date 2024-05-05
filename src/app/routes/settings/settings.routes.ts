import { Routes } from '@angular/router';
import { sectionedOutlet } from '../../library/sectioned-outlet/sectioned-outlet';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./settings.component').then(c => c.SettingsComponent),
    data: {
      ...sectionedOutlet('full'),
    }
  }
]