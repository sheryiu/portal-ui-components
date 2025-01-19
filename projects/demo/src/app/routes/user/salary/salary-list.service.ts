import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class SalaryListService implements VerticalLayoutDataProvider {

  heading = signal<string>('Salary');
  tabs = signal<TabConfig[]>([
    {
      label: 'Data',
      route: ['raw']
    }
  ]);
}
