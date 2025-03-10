import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';
import { AccessControlDataService } from '../../../data/access-control-data.service';

@Injectable()
export class AccessControlDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(AccessControlDataService)
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  heading = computed(() => this.list()?.find(v => v.id == this.id())?.userNumber ?? '--')
  tabs = signal<TabConfig[]>([{
    label: 'Overall',
    route: ['overall'],
  }, {
    label: 'Raw',
    route: ['raw'],
  }]);

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
