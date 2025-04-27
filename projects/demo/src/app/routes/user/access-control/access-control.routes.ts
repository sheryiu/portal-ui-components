import { Routes } from '@angular/router';
import { breadcrumb, preventDirtyLeave } from 'portal-ui-ng/components';
import { EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { map, switchMap } from 'rxjs';
import { AccessControlDataService } from '../../../data/access-control-data.service';
import { AccessControlDetailService } from './access-control-detail.service';
import { AccessControlEditService } from './access-control-edit.service';
import { AccessControlListService } from './access-control-list.service';
import { AccessControlOverallComponent } from './access-control-overall/access-control-overall.component';
import { AccessControlTableService } from './access-control-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Access Control' }),
    },
    children: [
      // detail
      {
        path: 'detail/:id',
        component: VerticalLayoutComponent,
        data: {
          ...breadcrumb({
            deps: [AccessControlDataService],
            titleFn: (route, service) => route.params.pipe(
              switchMap(p => service.getList().pipe(
                map(list => list.find(v => v.id == p['id'])?.userNumber ?? '--')
              ))
            )
          })
        },
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: AccessControlDetailService,
        }],
        children: [{
          path: 'overall',
          component: AccessControlOverallComponent,
        }, {
          path: 'raw',
          component: EditableContentComponent,
          canDeactivate: [preventDirtyLeave],
          providers: [{
            provide: EDITABLE_CONTENT_DATA_PROVIDER,
            useClass: AccessControlEditService,
          }],
        }, {
          path: '**',
          redirectTo: 'overall',
        }]
      },
      // list
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: AccessControlListService,
        }],
        children: [{
          path: '',
          component: TableContentComponent,
          providers: [{
            provide: TABLE_CONTENT_DATA_PROVIDER,
            useClass: AccessControlTableService,
          }]
        }]
      },
    ]
  }
]