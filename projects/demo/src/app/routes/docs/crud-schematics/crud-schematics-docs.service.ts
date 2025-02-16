import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class CrudSchematicsDocsService implements VerticalLayoutDataProvider {

  heading = signal<string>('CRUD');
  tabs = signal<TabConfig[]>([
    {
      label: 'Code',
      route: ['code']
    }
  ]);
}
