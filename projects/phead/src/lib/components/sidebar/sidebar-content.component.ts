import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ContentChildren, Input, QueryList, numberAttribute } from '@angular/core';
import { BackgroundGraphicsComponent } from '../background-graphics';
import { SidebarDrawerDirective } from './sidebar-drawer.directive';
import { SidebarMainDirective } from './sidebar-main.directive';

@Component({
  selector: 'phead-sidebar-content',
  standalone: true,
  host: {
    class: 'phead-sidebar-container__content'
  },
  imports: [BackgroundGraphicsComponent, NgTemplateOutlet],
  template: `
  <phead-background-graphics></phead-background-graphics>
  <div class="phead-sidebar-container__content__main">
    @if (main && main.templateRef) {
    <ng-container [ngTemplateOutlet]="main.templateRef"></ng-container>
    }
  </div>

  @if (drawers?.length! > 0) {
    <div class="phead-sidebar-container__content__drawer" [style.flex-basis.px]="drawerSize">
      @for (drawer of drawers; track drawer.id) {
      <ng-container [ngTemplateOutlet]="drawer.templateRef"></ng-container>
      }
    </div>
  }
  `
})
export class SidebarContentComponent {
  @ContentChild(SidebarMainDirective) main?: SidebarMainDirective;
  @ContentChildren(SidebarDrawerDirective, { descendants: true }) drawers?: QueryList<SidebarDrawerDirective>;

  @Input({ transform: numberAttribute }) drawerSize = 480;

}
