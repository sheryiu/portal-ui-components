import { Routes } from '@angular/router';
import { breadcrumb, preventDirtyLeave } from 'portal-ui-ng/components';
import { EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, PEEKABLE_ADDON_DATA_PROVIDER, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { SystemLogDetailService } from './system-log-detail.service';
import { SystemLogEditService } from './system-log-edit.service';
import { SystemLogListService } from './system-log-list.service';
import { SystemLogTableService } from './system-log-table.service';

const SYSTEM_LOG_DETAIL_CHILDREN: Routes = [
  {
    path: 'raw',
    component: EditableContentComponent,
    canDeactivate: [preventDirtyLeave],
    providers: [
      {
        provide: EDITABLE_CONTENT_DATA_PROVIDER,
        useClass: SystemLogEditService,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'raw',
  }
]

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'System Log' }),
    },
    children: [
      // detail
      {
        path: 'detail/:id',
        component: VerticalLayoutComponent,
        data: {
          ...breadcrumb({
            titleFn: (route) => {
              return route.params.pipe(
                map(params => params['id'])
              )
            }
          })
        },
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: SystemLogDetailService,
        }],
        children: SYSTEM_LOG_DETAIL_CHILDREN,
      },
      // list
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: SystemLogListService,
        }, {
          provide: PEEKABLE_ADDON_DATA_PROVIDER,
          useClass: SystemLogDetailService,
        }],
        children: [
          {
            path: ':id',
            outlet: 'peek',
            component: VerticalLayoutComponent,
            data: {
              ...breadcrumb({
                titleFn: (route) => {
                  return route.params.pipe(
                    map(params => params['id'])
                  )
                }
              })
            },
            providers: [{
              provide: VERTICAL_LAYOUT_DATA_PROVIDER,
              useClass: SystemLogDetailService,
            }],
            children: SYSTEM_LOG_DETAIL_CHILDREN,
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./system-log-dashboard/system-log-dashboard.component').then(c => c.SystemLogDashboardComponent),
          },
          {
            path: 'raw',
            component: TableContentComponent,
            providers: [{
              provide: TABLE_CONTENT_DATA_PROVIDER,
              useClass: SystemLogTableService,
            }],
          },
          {
            path: '**',
            redirectTo: 'dashboard'
          }
        ]
      }
    ]
  }
]