import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';
import { TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { SalaryListService } from './salary-list.service';
import { SalaryTableService } from './salary-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Salary' }),
    },
    children: [
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: SalaryListService,
        }],
        children: [
          {
            path: 'raw',
            component: TableContentComponent,
            providers: [{
              provide: TABLE_CONTENT_DATA_PROVIDER,
              useClass: SalaryTableService,
            }]
          },
          {
            path: '**',
            redirectTo: 'raw',
          }
        ]
      }
    ]
  }
]