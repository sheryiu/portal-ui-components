import { NgComponentOutlet } from '@angular/common';
import { Component, Type, inject } from '@angular/core';
import { QUICK_ACCESS_WIDGETS } from './quick-access.service';

@Component({
  selector: 'phead-quick-access',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  templateUrl: './quick-access.component.html',
})
export class QuickAccessComponent {
  private components = inject(QUICK_ACCESS_WIDGETS, { optional: true });
  componentTypes: Type<unknown>[] = [];

  constructor() {
    Promise.allSettled(
      this.components?.map(async c => {
        if (c.toString().startsWith('class')) return Promise.resolve(c as unknown as Type<unknown>);
        else return (c as unknown as Function)() as Type<unknown>;
      }) ?? []
    ).then(c => {
      this.componentTypes = c.filter((c): c is PromiseFulfilledResult<Type<unknown>> => c.status === 'fulfilled').map(c => c.value);
    });
  }
}
