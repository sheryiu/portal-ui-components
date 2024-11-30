import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, ObjectJsonSchema, TableContentDataProvider } from 'portal-ui-ng';
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
    hasAddControl: true,
    hasRefreshControl: true,
    hasAdvanceFilterControl: true,
    useVirtualScroll: true,
  }
  data = signal<Employee[]>([])
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
  simpleFilterConfig = signal<ObjectJsonSchema>({
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
  currentSimpleFilter = signal<any>({})
  private sortFn = computed<(a: Employee, b: Employee) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc
      ? -1
      : 1;
    return (a, b) => {
      switch (column.key) {
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })

  constructor() {
    effect(() => {
      const filter = this.currentSimpleFilter()
      const rawData = this.rawData()
      if (!rawData) return;
      const hasFilter = Object.values(filter ?? {}).some(v => !!v);
      this.data.set(
        (hasFilter
          ? rawData.filter(item => {
            if (!!filter['status'] && item.status != filter['status']) return false;
            if (!!filter['department'] && item.department != filter['department']) return false;
            return true;
          })
          : rawData)
          .toSorted(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  headerCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
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
            useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
          }
        ]
      }
    )
  }
  filter(): void {
    this.actionDrawer.open(
      EmployeeAdvanceFilterService,
      {
        overlayData: {
          filter: this.currentSimpleFilter(),
          onFilterApply: (newFilter: any) => this.currentSimpleFilter.set(newFilter),
        },
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
