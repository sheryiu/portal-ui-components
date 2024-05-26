import { Routes } from '@angular/router';
import { breadcrumb, layeredContainer } from 'portal-ui-ng';
import { map, switchMap } from 'rxjs';
import { SkillService } from '../../../store/skill.service';

export const SKILL_DETAIL_ROUTES: Routes = [
  {
    path: ':skillId',
    loadComponent: () => import('./skill-detail/skill-detail.component').then(c => c.SkillDetailComponent),
    data: {
      ...breadcrumb({
        deps: [SkillService] as const,
        titleFn: (route, service) => route.paramMap.pipe(
          map(params => params.get('skillId')!),
          switchMap(id => service.getOne(id)),
          map(d => Object.values(d?.name ?? {}).find(v => v != null) ?? '---'),
        )
      }),
      ...layeredContainer('half'),
    },
    children: [
    ]
  }
]

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./skill-list/skill-list.component').then(c => c.SkillListComponent),
    data: {
      ...breadcrumb({
        title: 'Skill'
      }),
      ...layeredContainer('full'),
    },
    children: SKILL_DETAIL_ROUTES,
  }
]