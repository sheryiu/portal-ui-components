import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class CustomerListService implements VerticalLayoutDataProvider {

  params?: WritableSignal<Params> | undefined = signal({});
  queryParams?: WritableSignal<Params> | undefined = signal({});
  heading: Signal<string> = signal('Customers');
  tabs: Signal<TabConfig[]> = signal([]);
}
