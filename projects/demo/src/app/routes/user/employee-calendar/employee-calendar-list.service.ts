import { Injectable, signal, Signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class EmployeeCalendarListService implements VerticalLayoutDataProvider {

  heading: Signal<string> = signal('Employee Calendar');
  tabs = signal<TabConfig[]>([
    {
      label: 'Monthly',
      route: ['monthly', '-1'],
    }, {
      label: 'Weekly',
      route: ['weekly'],
    }, {
      label: 'Data',
      route: ['data']
    }
  ]);

  storedSelectedTime = new Date();
  updateSelectedTime(time: Date) {
    this.storedSelectedTime = time;
  }
}
