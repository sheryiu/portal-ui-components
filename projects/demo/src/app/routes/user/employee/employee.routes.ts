import { Routes } from '@angular/router';
import { breadcrumb, EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng';
import { map, switchMap } from 'rxjs';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { EmployeeDetailService } from './employee-detail.service';
import { EmployeeEditService } from './employee-edit.service';
import { EmployeeListService } from './employee-list.service';
import { EmployeeTableService } from './employee-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Employee' }),
    },
    children: [
      {
        path: 'detail/:id',
        component: VerticalLayoutComponent,
        data: {
          ...breadcrumb({
            deps: [EmployeeDataService],
            titleFn: (route, service) => {
              return route.params.pipe(
                switchMap(p => service.getList().pipe(
                  map(list => list.find(v => v.id == p['id'])?.name ?? '--')
                ))
              )
            }
          })
        },
        providers: [
          {
            provide: VERTICAL_LAYOUT_DATA_PROVIDER,
            useClass: EmployeeDetailService,
          }
        ],
        children: [
          {
            path: '',
            component: EditableContentComponent,
            providers: [
              {
                provide: EDITABLE_CONTENT_DATA_PROVIDER,
                useClass: EmployeeEditService,
              }
            ]
          }
        ]
      },
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [
          {
            provide: VERTICAL_LAYOUT_DATA_PROVIDER,
            useClass: EmployeeListService,
          }
        ],
        children: [
          {
            path: '',
            component: TableContentComponent,
            providers: [
              {
                provide: TABLE_CONTENT_DATA_PROVIDER,
                useClass: EmployeeTableService,
              }
            ]
          }
        ]
      }
    ]
  }
]