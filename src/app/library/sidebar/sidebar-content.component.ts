import { Component, ContentChild, ContentChildren, Input, QueryList, numberAttribute } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BackgroundGraphicsComponent } from '../background-graphics/background-graphics.component';
import { SidebarDrawerDirective } from './sidebar-drawer.directive';
import { SidebarMainDirective } from './sidebar-main.directive';

@Component({
  selector: 'core-sidebar-content',
  standalone: true,
  host: {
    class: 'core-sidebar-container__content'
  },
  imports: [SharedModule, BackgroundGraphicsComponent],
  template: `
  <div class="core-sidebar-container__content__main">
    <core-background-graphics></core-background-graphics>
    @if (main && main.templateRef) {
    <ng-container [ngTemplateOutlet]="main.templateRef"></ng-container>
    }
  </div>

  @if (drawers?.length! > 0) {
    <div class="core-sidebar-container__content__drawer" [style.flex-basis.px]="drawerSize">
      @for (drawer of drawers; track drawer.id) {
      <ng-container [ngTemplateOutlet]="drawer.templateRef"></ng-container>
      }
    </div>
  }
  `
})
export class SidebarContentComponent {
  @ContentChild(SidebarMainDirective) main?: SidebarMainDirective;
  @ContentChildren(SidebarDrawerDirective) drawers?: QueryList<SidebarDrawerDirective>;

  @Input({ transform: numberAttribute }) drawerSize = 480;

}
