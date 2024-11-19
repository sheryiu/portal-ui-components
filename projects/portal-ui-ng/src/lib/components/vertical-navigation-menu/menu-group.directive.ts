import { contentChildren, Directive, forwardRef } from '@angular/core';
import { VERTICAL_NAVIGATION_MENU_CHILD, VerticalNavigationMenuChild } from './vertical-navigation-menu';

@Directive({
  selector: 'pui-menu-group',
  standalone: true,
  providers: [
    {
      provide: VERTICAL_NAVIGATION_MENU_CHILD,
      useExisting: forwardRef(() => MenuGroupDirective),
    }
  ]
})
export class MenuGroupDirective extends VerticalNavigationMenuChild {
  type = 'group' as const;
  children = contentChildren(VERTICAL_NAVIGATION_MENU_CHILD)

}
