import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from 'portal-ui-ng';
import { CustomerDataService } from '../../data/customer-data.service';
import { Customer } from '../../data/user.types';
import { CustomerAddService } from './customer-add.service';

@Injectable()
export class CustomerTableService implements TableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);

  configuration = {
    hasAddControl: true,
    hasRefreshControl: true,
    useVirtualScroll: true,
  };
  data: WritableSignal<Customer[]> = signal([]);
  columnsConfig: Signal<ColumnConfig[]> = signal<ColumnConfig[]>([
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
      jsonSchema: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay: Signal<string[]> = signal([
    'name', 'username', 'email', 'phone', 'line2', 'registeredSince',
  ]);

  constructor() {
    this.dataService.getList().subscribe(data => {
      this.data.set(data)
    })
  }

  routeToDetail?(item: Customer): any[] {
    return ['detail', item.id]
  }
  add(): void {
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
  }
}
