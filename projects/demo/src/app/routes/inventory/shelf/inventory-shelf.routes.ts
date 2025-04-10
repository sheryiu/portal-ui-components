import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';
import { EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { InventoryShelfDetailService } from './inventory-shelf-detail.service';
import { InventoryShelfEditService } from './inventory-shelf-edit.service';
import { InventoryShelfListService } from './inventory-shelf-list.service';
import { InventoryShelfMapComponent } from './inventory-shelf-map/inventory-shelf-map.component';
import { InventoryShelfTableService } from './inventory-shelf-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Shelf' }),
    },
    children: [
      {
        path: 'detail/:id',
        component: VerticalLayoutComponent,
        data: {
          ...breadcrumb({
            titleFn: (route) => route.params.pipe(
              map(p => p['id'])
            )
          }),
        },
        providers: [
          {
            provide: VERTICAL_LAYOUT_DATA_PROVIDER,
            useClass: InventoryShelfDetailService,
          }
        ],
        children: [
          {
            path: '',
            component: EditableContentComponent,
            providers: [
              {
                provide: EDITABLE_CONTENT_DATA_PROVIDER,
                useClass: InventoryShelfEditService,
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
            useClass: InventoryShelfListService,
          }
        ],
        children: [
          {
            path: 'map',
            component: InventoryShelfMapComponent,
          },
          {
            path: 'data',
            component: TableContentComponent,
            providers: [
              {
                provide: TABLE_CONTENT_DATA_PROVIDER,
                useClass: InventoryShelfTableService,
              }
            ]
          },
          {
            path: '**',
            redirectTo: 'map',
          }
        ]
      }
    ]
  }
]