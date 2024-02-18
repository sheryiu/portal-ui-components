import { Routes } from '@angular/router';
import { breadcrumb } from '../../../library/breadcrumbs/breadcrumbs';

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
          animation: 'armor-create'
        }
      },
    //   {
    //     path: ':armorSetId',
    //     loadComponent: () => import('./armor-set-detail/armor-set-detail.component').then(c => c.ArmorSetDetailComponent),
    //     data: {
    //       ...breadcrumb({
    //         deps: [ArmorSetService] as const,
    //         titleFn: (route, service) => route.paramMap.pipe(
    //           map(params => params.get('armorSetId')!),
    //           switchMap(id => service.getOne(id)),
    //           map(d => Object.values(d?.name ?? {}).find(v => v != null) ?? '---'),
    //         )
    //       }),
    //       animation: 'armor-set-detail'
    //     },
    //   }
    ]
  }
]