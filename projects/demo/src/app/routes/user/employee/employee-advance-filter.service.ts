import { inject, Injectable, signal } from '@angular/core';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, ObjectJsonSchema, OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng';
import { EmployeeDepartment, EmployeeStatus } from '../../../data/user.types';

@Injectable()
export class EmployeeAdvanceFilterService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<any> {
  private overlayData = inject(OVERLAY_DATA, { optional: true }) as any;

  configuration = {
    content: EditableContentComponent,
    hasRefreshControl: false,
  }

  // ActionDrawerLayoutDataProvider
  heading = signal("Filter Employee")
  overlayRef = signal<PuiOverlayRef | null>(null);

  // EditableContentDataProvider
  data = signal(this.overlayData?.['filter'] ?? {});
  jsonSchema = signal<ObjectJsonSchema>({
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
  state = signal<{ isDisabled?: boolean; isDirty?: boolean; }>({});
  currentState = signal<{ isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }>({});
  cancel(): void {
    this.overlayRef()?.close()
  }
  save(value: any): void {
    this.overlayData?.['onFilterApply']?.(value)
    this.overlayRef()?.close()
  }
}
