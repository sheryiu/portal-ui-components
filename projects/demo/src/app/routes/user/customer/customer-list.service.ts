import { Injectable, signal, Signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class CustomerListService implements VerticalLayoutDataProvider {

  heading: Signal<string> = signal('Customers');
  tabs: Signal<TabConfig[]> = signal([]);
}
