import { Routes } from '@angular/router';
import { breadcrumb, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng';
import { AccessControlListService } from './access-control-list.service';
import { AccessControlTableService } from './access-control-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Access Control' }),
    },
    children: [
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