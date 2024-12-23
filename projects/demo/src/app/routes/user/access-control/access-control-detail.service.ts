import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { AccessControlDataService } from '../../../data/access-control-data.service';

@Injectable()
export class AccessControlDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(AccessControlDataService)
  private list = toSignal(this.dataService.getList())

  params = signal<Params>({});
  heading = computed(() => this.list()?.find(v => v.id == this.params()['id'])?.userNumber ?? '--')
  tabs = signal<TabConfig[]>([{
    label: 'Overall',
    route: ['overall'],
  }, {
    label: 'Raw',
    route: ['raw'],
  }]);
}
