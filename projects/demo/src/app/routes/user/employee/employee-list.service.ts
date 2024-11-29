import { Injectable, signal, Signal } from '@angular/core';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class EmployeeListService implements VerticalLayoutDataProvider {

  params = signal<Params>({})
  queryParams = signal<Params>({})
  heading: Signal<string> = signal('Employees');
  tabs: Signal<TabConfig[]> = signal([]);
}
