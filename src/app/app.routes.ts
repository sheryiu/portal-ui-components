import { Routes } from '@angular/router';
import { breadcrumbData } from './components/breadcrumbs/breadcrumbs.service';
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
    data: {
      ...breadcrumbData({
        id: 'home',
        title: 'Home'
      })
    },
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
        data: {
          ...breadcrumbData({
            id: 'demos',
            title: 'Demos'
          })
        },
        providers: [
          providePaneNavigationTabs(DEMOS_TABS),
        ],
        loadChildren: () => import('./modules/demos/demos.module').then(m => m.DemosModule),
      }
    ]
  }
];
