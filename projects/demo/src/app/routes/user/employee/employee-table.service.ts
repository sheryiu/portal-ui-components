import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, computeFilterFunction, computeSortFunction, EDITABLE_CONTENT_DATA_PROVIDER, LayoutControlConfig, ObjectFieldConfiguration, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { Employee, EmployeeDepartment, EmployeeStatus } from '../../../data/user.types';
import { EmployeeAddService } from './employee-add.service';
import { EmployeeAdvanceFilterService } from './employee-advance-filter.service';

@Injectable()
export class EmployeeTableService implements TableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    id: 'employee-table',
    useVirtualScroll: true,
  }
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
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      department: {
        type: 'string',
        description: 'Department',
        enum: [''].concat(Object.values(EmployeeDepartment))
      },
      status: {
        type: 'string',
        description: 'Status',
        enum: [''].concat(Object.values(EmployeeStatus))
      }
    }
  })
  filterValue = signal<{ department?: EmployeeDepartment, status?: EmployeeStatus }>({})
  controlsConfig = signal<LayoutControlConfig[]>([
    {
      id: 'filter',
      label: 'Advance Filters',
      icon: 'filter_alt'
    },
    ...TABLE_CONTENT_DEFAULT_CONTROLS
  ]);
  private sortFn = computed<(a: Employee, b: Employee) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: Employee) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      'department': (item, key, value) => !!value && item.department == value,
      'status': (item, key, value) => !!value && item.status == value,
    })
  })

  routeToDetail(item: Employee): any[] {
    return ['detail', item.id]
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
          EmployeeAddService,
          {
            providers: [{
              provide: EDITABLE_CONTENT_DATA_PROVIDER,
              useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
            }]
          }
        )
        break;
      }
      case 'filter': {
        this.actionDrawer.open(
          EmployeeAdvanceFilterService,
          {
            overlayData: {
              filter: this.filterValue(),
              onFilterApply: (newFilter: any) => this.filterValue.set(newFilter),
            },
            providers: [{
              provide: EDITABLE_CONTENT_DATA_PROVIDER,
              useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
            }]
          }
        )
        break;
      }
    }
  }
}
