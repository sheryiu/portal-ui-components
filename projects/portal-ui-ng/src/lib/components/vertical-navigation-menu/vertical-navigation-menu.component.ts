import { Location, NgClass, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, contentChildren, DestroyRef, inject, Injector, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule, TypedTemplateDirective } from '../../base';
import { AccordionModule, AccordionTriggerDirective } from '../accordion';
import { MenuGroupDirective } from './menu-group.directive';
import { MenuItemDirective } from './menu-item.directive';
import { VERTICAL_NAVIGATION_MENU_CHILD } from './vertical-navigation-menu';

@Component({
  selector: 'pui-vertical-navigation-menu',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    TypedTemplateDirective,
    AccordionModule,
  ],
  templateUrl: './vertical-navigation-menu.component.html',
  styles: ``,
  host: {
    class: 'pui-vertical-navigation-menu'
  }
})
export class VerticalNavigationMenuComponent {
  private location = inject(Location)
  private destroyRef = inject(DestroyRef)
  private injector = inject(Injector)

  protected typeForGroup!: {
    children: (MenuItemDirective | MenuGroupDirective)[];
  }
  protected typeForChild!: {
    child: MenuItemDirective | MenuGroupDirective;
  };
  protected children = contentChildren(VERTICAL_NAVIGATION_MENU_CHILD)
  private accordionTriggers = viewChildren(AccordionTriggerDirective)

  constructor() {
    const ref = this.location.onUrlChange(() => {
      afterNextRender(() => {
        this.accordionTriggers().forEach(trigger => {
          const hasActiveChild = !!(trigger.elementRef.nativeElement as HTMLElement).nextElementSibling?.querySelector('.pui-vertical-navigation-menu__item--active')
          if (hasActiveChild) {
            trigger.isOpened.set(true);
          }
        })
      }, { injector: this.injector })
    })
    this.destroyRef.onDestroy(() => ref())
  }
}
