import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, LayoutControlConfig, ObjectJsonSchema, TableContentDataProvider } from 'portal-ui-ng';
import { AccessControlDataService } from '../../../data/access-control-data.service';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { AccessControl } from '../../../data/user.types';

@Injectable()
export class AccessControlTableService implements TableContentDataProvider<AccessControl> {
  private dataService = inject(AccessControlDataService)
  private employeeDataService = inject(EmployeeDataService)
  private rawData = toSignal(this.dataService.getList())
  private employeeList = toSignal(this.employeeDataService.getList())

  configuration = { useVirtualScroll: true };
  data = signal<AccessControl[]>([]);
  columnsConfig = signal<ColumnConfig[]>([{
    key: 'userNumber',
    label: '#',
    isSortedAsc: true,
  }, {
    key: 'employeeName',
    label: 'Employee',
    path: 'employee.name'
  }, {
    key: 'isEnabled',
    label: 'Enabled',
    jsonSchema: {
      type: 'boolean'
    }
  }]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>(['userNumber', 'employeeName', 'isEnabled']);
  simpleFilterConfig = signal<ObjectJsonSchema>({
    type: 'object',
    properties: {
      isEnabled: {
        description: 'Enabled',
        type: 'boolean'
      }
    }
  });
  simpleFilterValue = signal<any>({
    isEnabled: true,
  });

  controlsConfig = signal<LayoutControlConfig[]>([{
    id: 'refresh',
    icon: 'refresh',
    label: 'Refresh',
    mode: 'low-emphasis'
  }]);

  constructor() {
    effect(() => {
      const rawData = this.rawData()
      const employeeData = this.employeeList()
      if (!rawData || !employeeData) return;
      this.data.set(rawData
        .map(e => ({ ...e, employee: employeeData.find(_e => _e.id == e.employeeId) }))
        .filter(this.filterFn())
        .sort(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  private sortFn = computed<(a: AccessControl, b: AccessControl) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc ? -1 : 1;
    return (a, b) => {
      switch (column.key) {
        case 'employeeName': return ((a as any)['employee']?.['name'] > (b as any)['employee']?.['name']) ? (isDesc) : ((a as any)['employee']?.['name'] < (b as any)['employee']?.['name']) ? (-1 * isDesc) : 0;
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })
  private filterFn = computed<(item: AccessControl) => boolean>(() => {
    const filter = this.simpleFilterValue();
    const hasFilter = Object.values(filter ?? {}).some(v => (typeof v == 'string') ? !!v : (v != null));
    return (item) => (hasFilter && filter['isEnabled'] != null && filter['isEnabled'] != item.isEnabled)
      ? false
      : true
  })

  routeToDetail(item: AccessControl): any[] {
    return ['detail', item.id];
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
}
