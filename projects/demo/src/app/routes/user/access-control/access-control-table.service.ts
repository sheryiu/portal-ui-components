import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, computeFilterFunction, computeSortFunction, LayoutControlConfig, ObjectFieldConfiguration, TableContentDataProvider } from 'portal-ui-ng';
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
  data = computed(() => {
    const rawData = this.rawData()
    const employeeData = this.employeeList()
    if (!rawData || !employeeData) return [];
    return rawData
      .map(e => ({ ...e, employee: employeeData.find(_e => _e.id == e.employeeId) }))
      .filter(this.filterFn())
      .toSorted(this.sortFn())
  })
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
    fieldConfiguration: {
      type: 'boolean'
    }
  }]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>(['userNumber', 'employeeName', 'isEnabled']);
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      isEnabled: {
        description: 'Enabled',
        type: 'boolean'
      }
    }
  });
  filterValue = signal({
    isEnabled: true,
  });

  controlsConfig = signal<LayoutControlConfig[]>([{
    id: 'refresh',
    icon: 'refresh',
    label: 'Refresh',
    mode: 'low-emphasis'
  }]);

  private sortFn = computed<(a: AccessControl, b: AccessControl) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: AccessControl) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      'isEnabled': (item, key, value) => value != null && item.isEnabled === value
    })
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
  onFilterChange(value: any): void {
    this.filterValue.set(value)
  }
}
