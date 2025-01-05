import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, computeSortFunction, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';
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
  data = computed(() => {
    const rawData = this.rawData()
    const employeeData = this.employeeList()
    if (!rawData || !employeeData) return [];
    return rawData
      .map(e => ({ ...e, employee: employeeData.find(_e => _e.id == e.employeeId) }))
      .toSorted(this.sortFn())
  })
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
    },
    isSortedDesc: true,
  }, {
    key: 'endsAt',
    label: 'Ends',
    fieldConfiguration: {
      type: 'date-time',
      format: 'yyyy-MM-dd HH:mm'
    },
    isAlignEnd: true,
  }]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>(
    ['employeeName', 'label', 'startsFrom', 'endsAt']
  );
  controlsConfig = signal([]);

  private sortFn = computed<(a: EmployeeCalendarEvent, b: EmployeeCalendarEvent) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })

  routeToDetail?(item: EmployeeCalendarEvent): any[] {
    return ['../detail', item.id]
  }
  onHeaderCellClick?(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => updateSortedColumn(columns, columnKey))
  }
}
