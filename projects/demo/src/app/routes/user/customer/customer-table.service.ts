import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, computeFilterFunction, computeSortFunction, EDITABLE_CONTENT_DATA_PROVIDER, ObjectFieldConfiguration, ScreenWidthDetectorService, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';
import { CustomerAddService } from './customer-add.service';

@Injectable()
export class CustomerTableService implements TableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);
  private screenWidth = inject(ScreenWidthDetectorService)
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = computed(() => (this.rawData() ?? [])
    .filter(this.filterFn())
    .toSorted(this.sortFn())
  )
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
      fieldConfiguration: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay = signal({
    default: ['name', 'phone'],
    768: ['name', 'email', 'phone', 'registeredSince'],
    1536: ['name', 'username', 'email', 'phone', 'line2', 'registeredSince'],
  });
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name',
      },
      id: {
        type: 'string',
        description: 'ID',
      }
    }
  })
  filterValue = signal<{ id?: string, name?: string }>({})
  private sortFn = computed<(a: Customer, b: Customer) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: Customer) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      'id': (item, key, value) => !!value && item.id.toLowerCase().includes(value.toLowerCase()),
      'name': (item, key, value) => !!value && (item.username.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase()))
    })
  })

  routeToDetail?(item: Customer): any[] {
    if (this.screenWidth.above().sm()) {
      return ['/user', 'customer', { outlets: { peek: [item.id] } }]
    }
    return ['/user', 'customer', 'detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => updateSortedColumn(columns, columnKey))
  }
  onFilterChange(value: any): void {
    this.filterValue.set(value)
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
