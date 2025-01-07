import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScreenWidthDetectorService } from 'portal-ui-ng';
import { ColumnConfig, computeFilterFunction, computeSortFunction, ObjectFieldConfiguration, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';
import { CustomerDataService } from '../../../data/customer-data.service';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { SystemLog, SystemLogLevel } from '../../../data/log.types';
import { SystemLogDataService } from '../../../data/system-log-data.service';

@Injectable()
export class SystemLogTableService implements TableContentDataProvider<SystemLog> {
  private screenWidth = inject(ScreenWidthDetectorService);
  private dataService = inject(SystemLogDataService);
  private rawData = toSignal(this.dataService.getList())
  private customerDataService = inject(CustomerDataService);
  private customerData = toSignal(this.customerDataService.getList())
  private employeeDataService = inject(EmployeeDataService);
  private employeeData = toSignal(this.employeeDataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = computed(() => {
    const rawData = this.rawData() ?? [];
    const customerData = this.customerData() ?? [];
    const employeeData = this.employeeData() ?? [];
    return rawData
      .toSorted(this.sortFn())
      .filter(this.filterFn())
      .map(item => Object.assign(item, {
        user: item.customerId
          ? customerData.find(c => c.id == item.customerId)
          : item.employeeId
          ? employeeData.find(e => e.id == item.employeeId)
          : null,
      }));
  });
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'timestamp',
      label: 'Timestamp',
      fieldConfiguration: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm:ss.SSS'
      },
      isSortedDesc: true,
    },
    {
      key: 'level',
      label: 'Level',
    },
    {
      key: 'message',
      label: 'Message',
    },
    {
      key: 'user',
      path: 'user.name',
      label: 'User',
    }
  ]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>({
    default: ['timestamp', 'level', 'message'],
    1280: ['timestamp', 'level', 'message', 'user']
  });
  controlsConfig = signal(TABLE_CONTENT_DEFAULT_CONTROLS);
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID',
      },
      level: {
        type: 'string',
        description: 'Level',
        enum: Object.values(SystemLogLevel),
      },
      message: {
        type: 'string',
        description: 'Message',
      }
    }
  })
  filterValue = signal<{
    id?: string;
    level?: SystemLogLevel;
    message?: string;
  }>({})

  private sortFn = computed<(a: SystemLog, b: SystemLog) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: SystemLog) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      id: (item, key, value) => !!value && item.id == value,
      message: (item, key, value) => !!value && item.message.includes(value),
      level: (item, key, value) => !!value && item.level == value,
    })
  })

  routeToDetail(item: SystemLog): any[] {
    if (this.screenWidth.above().sm()) {
      return ['../', 'system-log', { outlets: { peek: [item.id] } }]
    }
    return ['../', 'system-log', 'detail', item.id]
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
        // TODO on add click
        break;
      }
      case 'refresh': {
        // TODO on refresh click
        break;
      }
    }
  }
}
