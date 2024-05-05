import { Component, Type, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { QUICK_ACCESS_COMPONENTS } from '../root-navigation';

@Component({
  selector: 'core-quick-access',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './quick-access.component.html',
})
export class QuickAccessComponent {
  private components = inject(QUICK_ACCESS_COMPONENTS, { optional: true });
  componentTypes: Type<unknown>[] = [];

  constructor() {
    Promise.allSettled(
      this.components?.map(async c => {
        if (c.component.toString().startsWith('class')) return Promise.resolve(c.component as Type<unknown>);
        else return (c.component as Function)() as Type<unknown>;
      }) ?? []
    ).then(c => {
      this.componentTypes = c.filter((c): c is PromiseFulfilledResult<Type<unknown>> => c.status === 'fulfilled').map(c => c.value);
    });
  }
}
