import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';
import { EmployeeDataService } from '../../../data/employee-data.service';

@Injectable()
export class EmployeeDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(EmployeeDataService)
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  heading = computed(() => this.list()?.find(v => v.id == this.id())?.name ?? '--')
  tabs: Signal<TabConfig[]> = signal([]);

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
