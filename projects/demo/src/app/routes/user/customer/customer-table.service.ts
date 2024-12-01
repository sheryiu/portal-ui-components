import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';
import { CustomerAddService } from './customer-add.service';

@Injectable()
export class CustomerTableService implements TableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = signal<Customer[]>([]);
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'line2',
      path: 'address.line2',
      label: 'Address (Line 2)',
    },
    {
      key: 'registeredSince',
      label: 'Registered',
      isAlignEnd: true,
      isSortedDesc: true,
      jsonSchema: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay: Signal<string[]> = signal([
    'name', 'username', 'email', 'phone', 'line2', 'registeredSince',
  ]);
  simpleFilterValue = signal<any>({})
  private sortFn = computed<(a: Customer, b: Customer) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc ? -1 : 1;
    return (a, b) => {
      switch (column.key) {
        case 'registeredSince': return (a.registeredSince.getTime() - b.registeredSince.getTime()) * isDesc;
        case 'line2': return ((a as any)['address'][column.key] > (b as any)['address'][column.key]) ? (isDesc) : ((a as any)['address'][column.key] < (b as any)['address'][column.key]) ? (-1 * isDesc) : 0;
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })
  private filterFn = computed<(item: Customer) => boolean>(() => {
    const filter = this.simpleFilterValue();
    const hasFilter = Object.values(filter ?? {}).some(v => !!v);
    return (item) => true
  })

  constructor() {
    effect(() => {
      const rawData = this.rawData()
      if (!rawData) return;
      this.data.set(rawData
        .filter(this.filterFn())
        .sort(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  routeToDetail?(item: Customer): any[] {
    return ['detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
    })
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'add': {
        this.actionDrawer.open(
          CustomerAddService,
          {
            providers: [
              {
                provide: EDITABLE_CONTENT_DATA_PROVIDER,
                useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
              }
            ]
          }
        )
        break;
      }
    }
  }
}
