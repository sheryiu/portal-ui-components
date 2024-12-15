import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';

@Injectable()
export class InventoryShelfDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(InventoryShelfDataService);
  private list = toSignal(this.dataService.getList())

  params: WritableSignal<Params> = signal({});
  heading: Signal<string> = computed(() => {
    const location = this.list()?.find(v => v.id == this.params()['id'])?.location;
    if (location) return `${location.aisle.toUpperCase()}${location.row} - ${location.layer}`;
    return '--'
  });
  tabs: Signal<TabConfig[]> = signal<TabConfig[]>([
    {
      label: 'Raw',
      route: ['./']
    }
  ]);
}
