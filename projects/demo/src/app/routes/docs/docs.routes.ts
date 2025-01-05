import { Routes } from '@angular/router';
import { breadcrumb, layeredContainer } from 'portal-ui-ng';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    children: [
      {
        path: 'button',
        loadComponent: () => import('./demo-button/demo-button.component').then(c => c.DemoButtonComponent),
        data: {
          ...breadcrumb({
            title: 'Button'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'dialog',
        loadComponent: () => import('./demo-dialog/demo-dialog.component').then(c => c.DemoDialogComponent),
        data: {
          ...breadcrumb({
            title: 'Dialog'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'dropdown',
        loadComponent: () => import('./demo-dropdown/demo-dropdown.component').then(c => c.DemoDropdownComponent),
        data: {
          ...breadcrumb({
            title: 'Dropdown'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'field',
        loadComponent: () => import('./demo-field/demo-field.component').then(c => c.DemoFieldComponent),
        data: {
          ...breadcrumb({
            title: 'Field'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'segmented-options',
        loadComponent: () => import('./demo-segmented-options/demo-segmented-options.component').then(c => c.DemoSegmentedOptionsComponent),
        data: {
          ...breadcrumb({
            title: 'Segmented Options'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'table',
        loadComponent: () => import('./demo-table/demo-table.component').then(c => c.DemoTableComponent),
        data: {
          ...breadcrumb({
            title: 'Table'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'table-of-contents',
        loadComponent: () => import('./demo-table-of-contents/demo-table-of-contents.component').then(c => c.DemoTableOfContentsComponent),
        data: {
          ...breadcrumb({
            title: 'Table of Contents'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'tooltip',
        loadComponent: () => import('./demo-tooltip/demo-tooltip.component').then(c => c.DemoTooltipComponent),
        data: {
          ...breadcrumb({
            title: 'Tooltip'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'layered-layout',
        loadComponent: () => import('./demo-layered-layout/demo-layered-layout.component').then(c => c.DemoLayeredLayoutComponent),
        data: {
          ...breadcrumb({
            title: 'Layered Layout'
          }),
          ...layeredContainer('half'),
        },
        children: [
          {
            path: 'full',
            loadComponent: () => import('./demo-layered-layout/demo-child/demo-child.component').then(c => c.DemoChildComponent),
            data: {
              ...breadcrumb({
                title: 'Full'
              }),
              ...layeredContainer('full'),
            },
          },
          {
            path: 'half',
            loadComponent: () => import('./demo-layered-layout/demo-child/demo-child.component').then(c => c.DemoChildComponent),
            data: {
              ...breadcrumb({
                title: 'Half'
              }),
              ...layeredContainer('half'),
            },
          },
        ]
      },
      {
        path: 'toggle',
        loadComponent: () => import('./demo-toggle/demo-toggle.component').then(c => c.DemoToggleComponent),
        data: {
          ...breadcrumb({
            title: 'Toggle'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'tab-bar',
        loadComponent: () => import('./demo-tab-bar/demo-tab-bar.component').then(c => c.DemoTabBarComponent),
        data: {
          ...breadcrumb({
            title: 'Tab Bar'
          }),
          ...layeredContainer('half'),
        }
      },
      {
        path: 'color',
        loadComponent: () => import('./demo-color/demo-color.component').then(c => c.DemoColorComponent),
        data: {
          ...breadcrumb({
            title: 'Color'
          }),
          ...layeredContainer('half'),
        }
      },
    ]
  }
]