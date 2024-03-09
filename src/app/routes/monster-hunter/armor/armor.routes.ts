import { Routes } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { breadcrumb } from '../../../library/breadcrumbs/breadcrumbs';
import { sectionedOutlet } from '../../../library/sectioned-outlet/sectioned-outlet';
import { ArmorService } from '../../../store/armor.service';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./armor-list/armor-list.component').then(c => c.ArmorListComponent),
    data: {
      ...breadcrumb({
        title: 'Armor'
      })
    },
    children: [
      {
        path: 'new',
        loadComponent: () => import('./armor-create/armor-create.component').then(c => c.ArmorCreateComponent),
        data: {
          ...breadcrumb({
            title: '+ New'
          }),
          ...sectionedOutlet('half'),
        }
      },
      {
        path: ':armorId',
        loadComponent: () => import('./armor-detail/armor-detail.component').then(c => c.ArmorDetailComponent),
        data: {
          ...breadcrumb({
            deps: [ArmorService] as const,
            titleFn: (route, service) => route.paramMap.pipe(
              map(params => params.get('armorId')!),
              switchMap(id => service.getOne(id)),
              map(d => Object.values(d?.name ?? {}).find(v => v != null) ?? '---'),
            )
          }),
          ...sectionedOutlet('half'),
        },
        children: [
          {
            path: 'edit-stats',
            loadComponent: () => import('./armor-edit-stats/armor-edit-stats.component').then(c => c.ArmorEditStatsComponent),
            data: {
              ...breadcrumb({
                deps: [ArmorService] as const,
                title: 'Edit Stats'
              }),
              ...sectionedOutlet('full'),
            },
          }
        ]
      }
    ]
  }
]