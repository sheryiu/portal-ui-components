import { Location, NgClass, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, contentChildren, DestroyRef, ElementRef, inject, Injector, signal, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IsInSetPipe } from 'portal-ui-ng';
import { ButtonModule, TypedTemplateDirective } from 'portal-ui-ng/base';
import { DividerComponent } from '../divider';
import { MenuDividerDirective } from './menu-divider.directive';
import { MenuGroupDirective } from './menu-group.directive';
import { MenuItemDirective } from './menu-item.directive';
import { VERTICAL_NAVIGATION_MENU_CHILD } from './vertical-navigation-menu';

@Component({
  selector: 'pui-vertical-navigation-menu',
  imports: [
    NgTemplateOutlet,
    NgClass,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    TypedTemplateDirective,
    DividerComponent,
    IsInSetPipe,
  ],
  templateUrl: './vertical-navigation-menu.component.html',
  host: {
    class: 'pui-vertical-navigation-menu'
  }
})
export class VerticalNavigationMenuComponent {
  private location = inject(Location)
  private destroyRef = inject(DestroyRef)
  private injector = inject(Injector)

  protected typeForGroup!: {
    children: (MenuItemDirective | MenuGroupDirective | MenuDividerDirective)[];
  }
  protected typeForChild!: {
    child: MenuItemDirective | MenuGroupDirective | MenuDividerDirective;
  };
  protected children = contentChildren(VERTICAL_NAVIGATION_MENU_CHILD)
  private groupElements = viewChildren('groupEl', { read: ElementRef })

  protected openedChildren = signal(new Set<HTMLElement>())

  constructor() {
    const ref = this.location.onUrlChange(() => {
      afterNextRender(() => {
        this.groupElements().forEach(el => {
          const hasActiveChild = !!(el.nativeElement as HTMLElement).nextElementSibling?.querySelector('.pui-vertical-navigation-menu__item--active')
          if (hasActiveChild) {
            this.openedChildren.update(set => {
              return new Set(set).add(el.nativeElement)
            })
          }
        })
      }, { injector: this.injector })
    })
    this.destroyRef.onDestroy(() => ref())
  }

  protected toggleGroup(element: HTMLElement) {
    this.openedChildren.update(set => {
      const clone = new Set(set);
      if (set.has(element)) {
        clone.delete(element);
      } else {
        clone.add(element);
      }
      return clone;
    })
  }
}
