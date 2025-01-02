import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { PeekableAddonDataProvider, TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';

@Injectable()
export class CustomerDetailService implements VerticalLayoutDataProvider, PeekableAddonDataProvider {
  private dataService = inject(CustomerDataService)
  private list = toSignal(this.dataService.getList())
  private id = signal('')

  heading = computed(() => this.list()?.find(v => v.id == this.id())?.name ?? '--')
  tabs = signal<TabConfig[]>([
    {
      label: 'Info',
      route: ['info'],
    },
    {
      label: 'Addresses',
      route: ['address'],
    },
    {
      label: 'Raw',
      route: ['raw']
    }
  ]);

  routeToFullContent = computed(() => {
    return ['../', 'customer', { outlets: {
      primary: ['detail', this.id()],
      peek: null,
    } }]
  })

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
