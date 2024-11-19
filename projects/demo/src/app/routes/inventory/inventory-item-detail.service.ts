import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../data/inventory-item-data.service';

@Injectable()
export class InventoryItemDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(InventoryItemDataService);
  private list = toSignal(this.dataService.getList())

  params: WritableSignal<Params> = signal({});
  heading: Signal<string> = computed(() => this.list()?.find(v => v.id == this.params()['id'])?.id ?? '--');
  tabs: Signal<TabConfig[]> = signal<TabConfig[]>([
    {
      label: 'Raw',
      route: ['./']
    }
  ]);
}
