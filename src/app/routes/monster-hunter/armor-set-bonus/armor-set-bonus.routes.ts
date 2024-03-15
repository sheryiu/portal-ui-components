import { Routes } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { breadcrumb } from '../../../library/breadcrumbs/breadcrumbs';
import { sectionedOutlet } from '../../../library/sectioned-outlet/sectioned-outlet';
import { ArmorSetBonusService } from '../../../store/armor-set-bonus.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({
        title: 'Set Bonus'
      })
    },
    loadComponent: () => import('./armor-set-bonus-list/armor-set-bonus-list.component').then(c => c.ArmorSetBonusListComponent),
    children: [
      {
        path: ':armorSetBonusId',
        loadComponent: () => import('./armor-set-bonus-detail/armor-set-bonus-detail.component').then(c => c.ArmorSetBonusDetailComponent),
        data: {
          ...breadcrumb({
            deps: [ArmorSetBonusService] as const,
            titleFn: (route, service) => route.paramMap.pipe(
              map(params => params.get('armorSetBonusId')!),
              switchMap(id => service.getOne(id)),
              map(d => Object.values(d?.name ?? {}).find(v => v != null) ?? '---'),
            )
          }),
          ...sectionedOutlet('half'),
        },
      }
    ]
  }
]