import { Directive, InjectionToken, input, output, TemplateRef } from '@angular/core';
import { IsActiveMatchOptions, NavigationBehaviorOptions, UrlCreationOptions } from '@angular/router';

@Directive({
  selector: 'pui-menu-child',
  standalone: true,
})
export abstract class VerticalNavigationMenuChild {
  readonly abstract type: 'item' | 'group';
  label = input.required<string>();
  icon = input<string>();
  iconTemplateRef = input<TemplateRef<unknown>>();
  route = input<any[]>();
  routerOptions = input<NavigationBehaviorOptions & UrlCreationOptions>();
  activeOptions = input<IsActiveMatchOptions | { exact: boolean; }>();
  click = output<MouseEvent>();
}
export const VERTICAL_NAVIGATION_MENU_CHILD = new InjectionToken<VerticalNavigationMenuChild>('');