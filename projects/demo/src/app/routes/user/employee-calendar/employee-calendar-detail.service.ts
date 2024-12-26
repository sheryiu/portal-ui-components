import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { EmployeeCalendarEventDataService } from '../../../data/employee-calendar-event-data.service';

@Injectable()
export class EmployeeCalendarDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(EmployeeCalendarEventDataService)
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  heading = computed(() => this.list()?.find(v => v.id == this.id())?.label ?? '--')
  tabs: Signal<TabConfig[]> = signal([]);

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
