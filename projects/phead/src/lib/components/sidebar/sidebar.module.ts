import { NgModule } from '@angular/core';
import { SidebarBreadcrumbsDirective } from './sidebar-breadcrumbs.directive';
import { SidebarContainerDirective } from './sidebar-container.directive';
import { SidebarContentComponent } from './sidebar-content.component';
import { SidebarDrawerDirective, SidebarDrawerSectionContentDirective, SidebarDrawerSectionDirective, SidebarDrawerSectionHeaderDirective } from './sidebar-drawer.directive';
import { SidebarMainDirective } from './sidebar-main.directive';

@NgModule({
  declarations: [
    SidebarDrawerSectionDirective,
    SidebarDrawerSectionHeaderDirective,
    SidebarDrawerSectionContentDirective,
  ],
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
    SidebarDrawerSectionDirective,
    SidebarDrawerSectionHeaderDirective,
    SidebarDrawerSectionContentDirective,
  ]
})
export class SidebarModule { }
