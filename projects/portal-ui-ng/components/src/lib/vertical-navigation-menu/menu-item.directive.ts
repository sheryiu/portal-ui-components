import { Directive, forwardRef } from '@angular/core';
import { VERTICAL_NAVIGATION_MENU_CHILD, VerticalNavigationMenuChild } from './vertical-navigation-menu';

@Directive({
  selector: 'pui-menu-item',
  standalone: true,
  providers: [
    {
      provide: VERTICAL_NAVIGATION_MENU_CHILD,
      useExisting: forwardRef(() => MenuItemDirective),
    }
  ]
})
export class MenuItemDirective extends VerticalNavigationMenuChild {
  type = 'item' as const;

}
