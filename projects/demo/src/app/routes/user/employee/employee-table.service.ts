import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, LayoutControlConfig, ObjectJsonSchema, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider } from 'portal-ui-ng';
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
  simpleFilterValue = signal<any>({})
  controlsConfig = signal<LayoutControlConfig[]>([
    {
      id: 'filter',
      label: 'Advance Filters',
      icon: 'filter_alt'
    },
    ...TABLE_CONTENT_DEFAULT_CONTROLS
  ]);
  private sortFn = computed<(a: Employee, b: Employee) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc ? -1 : 1;
    return (a, b) => {
      switch (column.key) {
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })
  private filterFn = computed<(item: Employee) => boolean>(() => {
    const filter = this.simpleFilterValue();
    const hasFilter = Object.values(filter ?? {}).some(v => !!v);
    return (item) => (hasFilter && !!filter['status'] && item.status != filter['status'])
      ? false
      : (hasFilter && !!filter['department'] && item.department != filter['department'])
      ? false
      : true
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

  routeToDetail(item: Employee): any[] {
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
  onUpdateSimpleFilter(value: any): void {
    this.simpleFilterValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'add': {
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
        break;
      }
      case 'filter': {
        this.actionDrawer.open(
          EmployeeAdvanceFilterService,
          {
            overlayData: {
              filter: this.simpleFilterValue(),
              onFilterApply: (newFilter: any) => this.simpleFilterValue.set(newFilter),
            },
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
