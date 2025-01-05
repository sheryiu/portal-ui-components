import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';

@Injectable()
export class InventoryItemDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(InventoryItemDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  heading = computed(() => this.list()?.find(v => v.id == this.id())?.id ?? '--')
  tabs: Signal<TabConfig[]> = signal<TabConfig[]>([
    {
      label: 'Info',
      route: ['info']
    },
    {
      label: 'Raw',
      route: ['raw']
    }
  ]);

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
