import { NgModule } from '@angular/core';
import { SidebarBreadcrumbsDirective } from './sidebar-breadcrumbs.directive';
import { SidebarContainerDirective } from './sidebar-container.directive';
import { SidebarContentComponent } from './sidebar-content.component';
import { SidebarDrawerDirective } from './sidebar-drawer.directive';
import { SidebarMainDirective } from './sidebar-main.directive';

@NgModule({
  declarations: [],
  imports: [
    SidebarContainerDirective,
    SidebarBreadcrumbsDirective,
    SidebarContentComponent,
    SidebarMainDirective,
    SidebarDrawerDirective,
  ],
  exports: [
    SidebarContainerDirective,
    SidebarBreadcrumbsDirective,
    SidebarContentComponent,
    SidebarMainDirective,
    SidebarDrawerDirective,
  ]
})
export class SidebarModule { }
