import { inject, Injectable, signal } from '@angular/core';
import { SnackbarDuration, SnackbarService } from 'portal-ui-ng/components';
import { ColumnConfig, TableContentDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class SalaryTableService implements TableContentDataProvider<any> {
  private snackbar = inject(SnackbarService)

  data = signal<any[]>([]);
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'employeeName',
      label: 'Employee',
      path: 'employee.name'
    },
  ]);
  columnsToDisplay = signal<string[] | Record<number | 'default', string[]>>(['id', 'employeeName']);

  routeToDetail(item: any): any[] {
    return ['../detail', item.id]
  }

  onInit(): void {
    this.snackbar.openError(
      'Error: Unauthorized access. You do not have the necessary permissions to view this resource.<br/>Please contact your administrator.',
      {
        duration: SnackbarDuration.INFINITE,
      }
    )
  }
}
