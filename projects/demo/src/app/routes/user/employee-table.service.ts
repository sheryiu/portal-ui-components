import { inject, Injectable, Signal, signal } from '@angular/core';
import { ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from 'portal-ui-ng';
import { EmployeeDataService } from '../../data/employee-data.service';
import { Employee } from '../../data/user.types';
import { EmployeeAddService } from './employee-add.service';

@Injectable()
export class EmployeeTableService implements TableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);

  configuration = {
    hasAddControl: true,
    hasRefreshControl: true,
    useVirtualScroll: true,
  }
  data = signal<Employee[]>([])
  columnsConfig: Signal<ColumnConfig[]> = signal<ColumnConfig[]>([
    {
      key: 'name',
      label: 'Name',
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
      key: 'department',
      label: 'Department',
    },
    {
      key: 'position',
      label: 'Position',
    },
    {
      key: 'status',
      label: 'Status'
    }
  ])
  columnsToDisplay: Signal<string[]> = signal([
    'name', 'email', 'phone', 'department', 'position', 'status'
  ])

  constructor() {
    this.dataService.getList().subscribe(data => {
      this.data.set(data)
    })
  }

  routeToDetail?(item: Employee): any[] {
    return ['detail', item.id]
  }
  add(): void {
    this.actionDrawer.open(
      EmployeeAddService,
      {
        providers: [
          {
            provide: EDITABLE_CONTENT_DATA_PROVIDER,
            useClass: EmployeeAddService,
          }
        ]
      }
    )
  }
}
