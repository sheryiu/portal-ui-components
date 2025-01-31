import { Routes } from '@angular/router';
import { breadcrumb } from 'portal-ui-ng/components';
import { EDITABLE_CONTENT_DATA_PROVIDER, EditableContentComponent, PEEKABLE_ADDON_DATA_PROVIDER, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { MediaDetailService } from './media-detail.service';
import { MediaEditService } from './media-edit.service';
import { MediaListService } from './media-list.service';
import { MediaTableService } from './media-table.service';

const MEDIA_DETAIL_CHILDREN: Routes = [
  {
    path: 'raw',
    component: EditableContentComponent,
    providers: [
      {
        provide: EDITABLE_CONTENT_DATA_PROVIDER,
        useClass: MediaEditService,
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
      ...breadcrumb({ title: 'Media' }),
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
          useClass: MediaDetailService,
        }],
        children: MEDIA_DETAIL_CHILDREN,
      },
      // list
      {
        path: '',
        component: VerticalLayoutComponent,
        providers: [{
          provide: VERTICAL_LAYOUT_DATA_PROVIDER,
          useClass: MediaListService,
        }, {
          provide: PEEKABLE_ADDON_DATA_PROVIDER,
          useClass: MediaDetailService,
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
              useClass: MediaDetailService,
            }],
            children: MEDIA_DETAIL_CHILDREN,
          },
          {
            path: 'file',
            children: [
              {
                path: ':folderId',
                loadComponent: () => import('./media-manager/media-manager.component').then(c => c.MediaManagerComponent),
              },
              {
                path: '**',
                redirectTo: 'null'
              }
            ]
          },
          {
            path: 'raw',
            component: TableContentComponent,
            providers: [{
              provide: TABLE_CONTENT_DATA_PROVIDER,
              useClass: MediaTableService,
            }],
          },
          {
            path: '**',
            redirectTo: 'file',
          }
        ]
      }
    ]
  }
]