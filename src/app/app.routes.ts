import { Routes } from '@angular/router';
import { provideBreadcrumb } from './components/breadcrumbs/breadcrumbs.service';
import { PaneLayoutComponent } from './components/pane-layout/pane-layout.component';
import { providePaneNavigationTabs } from './components/pane-navigation/pane-navigation.service';
import { RootLayoutComponent } from './components/root-layout/root-layout.component';
import { provideRootNavigationTabs } from './components/root-navigation/root-navigation.service';
import { ATOMS_TABS } from './modules/atoms/atoms.tabs';
import { DEMOS_TABS } from './modules/demos/demos.module';

export const routes: Routes = [
  {
    path: 'design',
    component: RootLayoutComponent,
    providers: [
      provideRootNavigationTabs([
        {
          id: 'atoms',
          title: 'Atoms',
          route: ['atoms'],
        },
        {
          id: 'molecules',
          title: 'Molecules',
          route: ['molecules'],
        },
        {
          id: 'organisms',
          title: 'Organisms',
          route: ['organisms'],
        },
        {
          id: 'demos',
          title: 'Demo',
          route: ['demos'],
        },
        {
          id: 'test',
          icon: 'question_answer',
          route: ['test'],
        },
      ]),
      provideBreadcrumb({
        id: 'home',
        title: 'Home',
      }),
    ],
    children: [
      {
        path: 'atoms',
        component: PaneLayoutComponent,
        providers: [
          providePaneNavigationTabs(ATOMS_TABS),
        ],
        loadChildren: () => import('./modules/atoms/atoms.module').then(m => m.AtomsModule),
      },
      {
        path: 'molecules',
        component: PaneLayoutComponent,
        loadChildren: () => import('./modules/molecules/molecules.module').then(m => m.MoleculesModule),
      },
      {
        path: 'demos',
        component: PaneLayoutComponent,
        providers: [
          providePaneNavigationTabs(DEMOS_TABS),
          provideBreadcrumb({
            id: 'demos',
            title: 'Demos',
          }),
        ],
        loadChildren: () => import('./modules/demos/demos.module').then(m => m.DemosModule),
      }
    ]
  }
];
