import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { breadcrumbData } from '../../components/breadcrumbs/breadcrumbs.service';

export const DEMOS_TABS = [
  {
    id: 'list-demo',
    title: 'List',
    icon: 'list',
    route: ['list']
  },
  {
    id: 'form',
    title: 'Form',
    icon: 'drive_file_rename_outline',
    route: ['form']
  },
]

const ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./list-demo/list-demo.component').then(c => c.ListDemoComponent),
    data: {
      ...breadcrumbData({
        id: 'list-demo',
        title: 'List Demo'
      })
    }
  },
  {
    path: 'form',
    loadComponent: () => import('./form-demo/form-demo.component').then(c => c.FormDemoComponent),
    data: {
      ...breadcrumbData({
        id: 'form-demo',
        title: 'Form Demo'
      })
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES),
  ],
  exports: [
    RouterModule,
  ]
})
export class DemosModule { }
