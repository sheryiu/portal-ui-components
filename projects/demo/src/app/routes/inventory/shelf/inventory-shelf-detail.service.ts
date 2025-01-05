import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';

@Injectable()
export class InventoryShelfDetailService implements VerticalLayoutDataProvider {
  private dataService = inject(InventoryShelfDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  heading: Signal<string> = computed(() => {
    const location = this.list()?.find(v => v.id == this.id())?.location;
    if (location) return `${location.aisle.toUpperCase()}${location.row} - ${location.layer}`;
    return '--'
  });
  tabs: Signal<TabConfig[]> = signal<TabConfig[]>([
    {
      label: 'Raw',
      route: ['./']
    }
  ]);

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
