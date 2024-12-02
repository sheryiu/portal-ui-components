import { Directive, forwardRef } from '@angular/core';
import { VERTICAL_NAVIGATION_MENU_CHILD, VerticalNavigationMenuChild } from './vertical-navigation-menu';

@Directive({
  selector: 'pui-menu-divider',
  standalone: true,
  providers: [
    {
      provide: VERTICAL_NAVIGATION_MENU_CHILD,
      useExisting: forwardRef(() => MenuDividerDirective),
    }
  ]
})
export class MenuDividerDirective extends VerticalNavigationMenuChild {
  type = 'divider' as const;

}
