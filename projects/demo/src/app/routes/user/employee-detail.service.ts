import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { EmployeeDataService } from '../../data/employee-data.service';

@Injectable()
export class EmployeeDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(EmployeeDataService)
  private list = toSignal(this.dataService.getList())

  params: WritableSignal<Params> = signal({});
  queryParams: WritableSignal<Params> = signal({});
  heading: Signal<string> = computed(() => this.list()?.find(v => v.id == this.params()['id'])?.name ?? '--');
  tabs: Signal<TabConfig[]> = signal([]);
}
