import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, TableContentDataProvider } from 'portal-ui-ng';
import { EmployeeCalendarEventDataService } from '../../../data/employee-calendar-event-data.service';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { EmployeeCalendarEvent } from '../../../data/user.types';

@Injectable()
export class EmployeeCalendarTableService implements TableContentDataProvider<EmployeeCalendarEvent> {
  private dataService = inject(EmployeeCalendarEventDataService);
  private rawData = toSignal(this.dataService.getList());
  private employeeDataService = inject(EmployeeDataService);
  private employeeList = toSignal(this.employeeDataService.getList());

  configuration = {
    useVirtualScroll: true,
  }
  data = signal<EmployeeCalendarEvent[]>([]);
  columnsConfig = signal<ColumnConfig[]>([{
    key: 'employeeName',
    label: 'Employee',
    path: 'employee.name',
  }, {
    key: 'label',
    label: 'Label',
  }, {
    key: 'startsFrom',
    label: 'Starts',
    fieldConfiguration: {
      type: 'date-time',
      format: 'yyyy-MM-dd HH:mm'
    }
  }, {
    key: 'endsAt',
    label: 'Ends',
    fieldConfiguration: {
      type: 'date-time',
      format: 'yyyy-MM-dd HH:mm'
    }
  }]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>(
    ['employeeName', 'label', 'startsFrom', 'endsAt']
  );
  controlsConfig = signal([]);

  constructor() {
    effect(() => {
      const rawData = this.rawData()
      const employeeData = this.employeeList()
      if (!rawData || !employeeData) return;
      this.data.set(rawData
        .map(e => ({ ...e, employee: employeeData.find(_e => _e.id == e.employeeId) }))
        .sort(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  private sortFn = computed<(a: EmployeeCalendarEvent, b: EmployeeCalendarEvent) => number>(() => {
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

  routeToDetail?(item: EmployeeCalendarEvent): any[] {
    return ['../detail', item.id]
  }
  onHeaderCellClick?(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
    })
  }
}
