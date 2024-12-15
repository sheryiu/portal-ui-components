import { Routes } from '@angular/router';
import { breadcrumb, EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, PEEKABLE_ADDON_DATA_PROVIDER, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng';
import { map, switchMap } from 'rxjs';
import { CustomerDataService } from '../../../data/customer-data.service';
import { CustomerAddressEditService } from './customer-address-edit.service';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { CustomerDetailService } from './customer-detail.service';
import { CustomerEditService } from './customer-edit.service';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerListService } from './customer-list.service';
import { CustomerTableService } from './customer-table.service';

const CUSTOMER_DETAIL_CHILDREN: Routes = [
  {
    path: 'info',
    component: CustomerInfoComponent,
  },
  {
    path: 'address',
    component: CustomerAddressComponent,
    children: [
      {
        path: ':index',
        component: EditableContentComponent,
        providers: [
          {
            provide: EDITABLE_CONTENT_DATA_PROVIDER,
            useClass: CustomerAddressEditService,
          }
        ]
      }
    ]
  },
  {
    path: 'raw',
    component: EditableContentComponent,
    providers: [
      {
        provide: EDITABLE_CONTENT_DATA_PROVIDER,
        useClass: CustomerEditService,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'info',
  }
]

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      ...breadcrumb({ title: 'Customer' }),
    },
    children: [
      // detail
      {
        path: 'detail/:id',
        component: VerticalLayoutComponent,
        data: {
          ...breadcrumb({
            deps: [CustomerDataService],
            titleFn: (route, service) => {
              return route.params.pipe(
                switchMap(p => service.getList().pipe(
                  map(list => list.find(v => v.id == p['id'])?.name ?? '--')
                ))
              )
            }
          })
        },
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: CustomerDetailService,
        }],
        children: CUSTOMER_DETAIL_CHILDREN,
      },
      // list
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: CustomerListService,
        }, {
          provide: PEEKABLE_ADDON_DATA_PROVIDER,
          useClass: CustomerDetailService,
        }],
        children: [
          {
            path: ':id',
            outlet: 'peek',
            component: VerticalLayoutComponent,
            data: {
              ...breadcrumb({
                deps: [CustomerDataService],
                titleFn: (route, service) => {
                  return route.params.pipe(
                    switchMap(p => service.getList().pipe(
                      map(list => list.find(v => v.id == p['id'])?.name ?? '--')
                    ))
                  )
                }
              })
            },
            providers: [{
              provide: VERTICAL_LAYOUT_DATA_PROVIDER,
              useClass: CustomerDetailService,
            }],
            children: CUSTOMER_DETAIL_CHILDREN,
          },
          {
            path: '',
            component: TableContentComponent,
            providers: [{
              provide: TABLE_CONTENT_DATA_PROVIDER,
              useClass: CustomerTableService,
            }],
          }
        ]
      }
    ]
  }
]