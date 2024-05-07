import { Routes } from '@angular/router';
import { breadcrumb, layeredContainer } from 'phead';
import { map, switchMap } from 'rxjs';
import { ArmorSetService } from '../../../store/armor-set.service';

export const ARMOR_SET_ROUTES: Routes = [
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
      ...layeredContainer('half'),
    },
  }
]

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./armor-set-list/armor-set-list.component').then(c => c.ArmorSetListComponent),
    data: {
      ...breadcrumb({
        title: 'Armor Set'
      }),
      ...layeredContainer('full')
    },
    children: ARMOR_SET_ROUTES
  }
]