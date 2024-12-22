import { Injectable, signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class AccessControlListService implements VerticalLayoutDataProvider {

  params?: WritableSignal<Params> | undefined;
  queryParams?: WritableSignal<Params> | undefined;
  heading = signal<string>('Access Control Management');
  tabs = signal<TabConfig[]>([]);
}
