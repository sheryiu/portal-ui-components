import { Injectable, signal, Signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class EmployeeListService implements VerticalLayoutDataProvider {

  heading: Signal<string> = signal('Employees');
  tabs: Signal<TabConfig[]> = signal([]);
}
