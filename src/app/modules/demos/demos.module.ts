import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideBreadcrumb } from '../../components/breadcrumbs/breadcrumbs.service';

export const DEMOS_TABS = [
  {
    id: 'list-demo',
    title: 'List',
    icon: 'list',
    route: ['list']
  },
  {
    id: 'forms',
    title: 'Forms',
    icon: 'drive_file_rename_outline'
  },
]

const ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./list-demo/list-demo.component').then(c => c.ListDemoComponent),
    providers: [
      provideBreadcrumb({
        id: 'list-demo',
        title: 'List Demo'
      })
    ]
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
