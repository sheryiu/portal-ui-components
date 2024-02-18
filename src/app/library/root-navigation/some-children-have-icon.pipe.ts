import { Pipe, PipeTransform } from '@angular/core';
import { RootNavigationTabs } from './root-navigation';

type El<T extends Array<any>> = T extends Array<infer E> ? E : never;

@Pipe({
  name: 'someChildrenHaveIcon',
  standalone: true
})
export class SomeChildrenHaveIconPipe implements PipeTransform {

  transform(value: El<RootNavigationTabs>['children'] | null) {
    return value?.some(t => t.type === 'route' && !!t.icon)
  }

}
