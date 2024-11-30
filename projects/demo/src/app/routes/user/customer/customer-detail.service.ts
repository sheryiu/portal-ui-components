import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';

@Injectable()
export class CustomerDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(CustomerDataService)
  private list = toSignal(this.dataService.getList())

  params: WritableSignal<Params> = signal({});
  queryParams: WritableSignal<Params> = signal({});
  heading: Signal<string> = computed(() => this.list()?.find(v => v.id == this.params()['id'])?.name ?? '--');
  tabs: Signal<TabConfig[]> = signal([]);
}