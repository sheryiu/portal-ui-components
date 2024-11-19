import { Routes } from '@angular/router';
import { breadcrumb, EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng';
import { map } from 'rxjs';
import { InventoryItemDetailService } from './inventory-item-detail.service';
import { InventoryItemEditService } from './inventory-item-edit.service';
import { InventoryItemListService } from './inventory-item-list.service';
import { InventoryItemTableService } from './inventory-item-table.service';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Item' }),
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
            useClass: InventoryItemDetailService,
          }
        ],
        children: [
          {
            path: '',
            component: EditableContentComponent,
            providers: [
              {
                provide: EDITABLE_CONTENT_DATA_PROVIDER,
                useClass: InventoryItemEditService,
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
            useClass: InventoryItemListService,
          }
        ],
        children: [
          {
            path: '',
            component: TableContentComponent,
            providers: [
              {
                provide: TABLE_CONTENT_DATA_PROVIDER,
                useClass: InventoryItemTableService,
              }
            ]
          },
        ]
      }
    ]
  }
]