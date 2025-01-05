import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';
import { EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { map, switchMap } from 'rxjs';
import { EmployeeCalendarEventDataService } from '../../../data/employee-calendar-event-data.service';
import { EmployeeCalendarDetailService } from './employee-calendar-detail.service';
import { EmployeeCalendarEditService } from './employee-calendar-edit.service';
import { EmployeeCalendarListService } from './employee-calendar-list.service';
import { EmployeeCalendarTableService } from './employee-calendar-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Calendar' }),
    },
    children: [{
      path: 'detail/:id',
      component: VerticalLayoutComponent,
      data: {
        ...breadcrumb({
          deps: [EmployeeCalendarEventDataService],
          titleFn: (route, service) => {
            return route.params.pipe(
              switchMap(p => service.getList().pipe(
                map(list => list.find(v => v.id == p['id'])?.label ?? '--')
              ))
            )
          }
        })
      },
      providers: [{
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: EmployeeCalendarDetailService,
      }],
      children: [{
        path: 'raw',
        component: EditableContentComponent,
        providers: [{
          provide: EDITABLE_CONTENT_DATA_PROVIDER,
          useClass: EmployeeCalendarEditService,
        }]
      }, {
        path: '**',
        redirectTo: 'raw',
      }]
    }, {
      path: '',
      component: VerticalLayoutComponent,
      providers: [{
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: EmployeeCalendarListService,
      }],
      children: [{
        path: 'monthly/:timestamp',
        loadComponent: () => import('./employee-calendar-monthly/employee-calendar-monthly.component').then(c => c.EmployeeCalendarMonthlyComponent),
        providers: [{
          provide: EmployeeCalendarListService,
          useExisting: VERTICAL_LAYOUT_DATA_PROVIDER,
        }]
      }, {
        path: 'data',
        component: TableContentComponent,
        providers: [{
          provide: TABLE_CONTENT_DATA_PROVIDER,
          useClass: EmployeeCalendarTableService,
        }]
      }, {
        path: '**',
        redirectTo: 'monthly/-1',
      }]
    }]
  }
]