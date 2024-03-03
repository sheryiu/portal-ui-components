import { Router, Routes } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { breadcrumb } from '../../../library/breadcrumbs/breadcrumbs';
import { ArmorSetService } from '../../../store/armor-set.service';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./armor-set-list/armor-set-list.component').then(c => c.ArmorSetListComponent),
    data: {
      ...breadcrumb({
        title: 'Armor Set'
      })
    },
    children: [
      {
        path: ':armorSetId',
        loadComponent: () => import('./armor-set-detail/armor-set-detail.component').then(c => c.ArmorSetDetailComponent),
        data: {
          ...breadcrumb({
            deps: [ArmorSetService] as const,
            titleFn: (route, service) => route.paramMap.pipe(
              map(params => params.get('armorSetId')!),
              switchMap(id => service.getOne(id)),
              map(d => Object.values(d?.name ?? {}).find(v => v != null) ?? '---'),
            )
          }),
          animation: 'armor-set-detail',
          displayType: 'half',
        },
      }
    ]
  }
]