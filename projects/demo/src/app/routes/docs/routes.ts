import { Routes } from '@angular/router';
import { VERTICAL_LAYOUT_DATA_PROVIDER, VerticalLayoutComponent } from 'portal-ui-ng/pages';
import { CrudSchematicsDocsService } from './crud-schematics/crud-schematics-docs.service';
import { LoadingPanelDocsService } from './loading-panel/loading-panel-docs.service';
import { ModalDialogDocsService } from './modal-dialog/modal-dialog-docs.service';
import { RootSidenavDocsService } from './root-sidenav/root-sidenav-docs.service';
import { SnackbarDocsService } from './snackbar/snackbar-docs.service';

export const ROUTES: Routes = [
  {
    path: 'loading-panel',
    component: VerticalLayoutComponent,
    providers: [
      {
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: LoadingPanelDocsService,
      }
    ],
    children: [
      {
        path: 'demo',
        loadComponent: () => import('./loading-panel/loading-panel-demo/loading-panel-demo.component').then(c => c.LoadingPanelDemoComponent),
      },
      {
        path: '**',
        redirectTo: 'demo'
      }
    ]
  },
  {
    path: 'modal-dialog',
    component: VerticalLayoutComponent,
    providers: [
      {
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: ModalDialogDocsService,
      }
    ],
    children: [
      {
        path: 'demo',
        loadComponent: () => import('./modal-dialog/modal-dialog-demo/modal-dialog-demo.component').then(c => c.ModalDialogDemoComponent),
      },
      {
        path: '**',
        redirectTo: 'demo'
      }
    ]
  },
  {
    path: 'root-sidenav',
    component: VerticalLayoutComponent,
    providers: [
      {
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: RootSidenavDocsService,
      }
    ],
    children: [
      {
        path: 'code',
        loadComponent: () => import('./root-sidenav/root-sidenav-code/root-sidenav-code.component').then(c => c.RootSidenavCodeComponent),
      },
      {
        path: '**',
        redirectTo: 'code'
      }
    ]
  },
  {
    path: 'snackbar',
    component: VerticalLayoutComponent,
    providers: [
      {
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: SnackbarDocsService,
      }
    ],
    children: [
      {
        path: 'demo',
        loadComponent: () => import('./snackbar/snackbar-demo/snackbar-demo.component').then(c => c.SnackbarDemoComponent),
      },
      {
        path: '**',
        redirectTo: 'demo'
      }
    ]
  },
  {
    path: 'crud-schematics',
    component: VerticalLayoutComponent,
    providers: [
      {
        provide: VERTICAL_LAYOUT_DATA_PROVIDER,
        useClass: CrudSchematicsDocsService,
      }
    ],
    children: [
      {
        path: 'code',
        loadComponent: () => import('./crud-schematics/crud-schematics-code/crud-schematics-code.component').then(c => c.CrudSchematicsCodeComponent),
      },
      {
        path: '**',
        redirectTo: 'code'
      }
    ]
  }
]