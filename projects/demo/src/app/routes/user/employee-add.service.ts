import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, ObjectJsonSchema, PuiOverlayRef } from 'portal-ui-ng';
import { EmployeeDataService } from '../../data/employee-data.service';
import { Employee, EmployeeDepartment, EmployeePosition, EmployeeStatus } from '../../data/user.types';

@Injectable()
export class EmployeeAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);

  configuration = {
    content: EditableContentComponent,
    hasRefreshControl: false,
  }

  data = signal(null);
  jsonSchema = signal<ObjectJsonSchema>({
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name',
      },
      email: {
        type: 'string',
        description: 'Email',
      },
      phone: {
        type: 'string',
        description: 'Phone',
      },
      department: {
        type: 'string',
        description: 'Department',
        enum: Object.values(EmployeeDepartment),
      },
      position: {
        type: 'string',
        description: 'Position',
        enum: Object.values(EmployeePosition),
      },
      dateOfJoining: {
        type: 'date-time',
        description: 'Date of Joining',
      },
      dateOfLeaving: {
        type: 'date-time',
        description: 'Date of Leaving',
      },
      status: {
        type: 'string',
        description: 'Status',
        enum: Object.values(EmployeeStatus),
      }
    }
  });
  state: WritableSignal<{ isDisabled?: boolean; isDirty?: boolean; }> = signal({ isDirty: true });
  currentState: WritableSignal<{ isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }> = signal({});
  cancel(): void {
    this.data.set({} as any)
    this.overlayRef()?.close()
  }
  save(value: Employee): void {
    value.id = faker.string.nanoid();
    this.dataService.add(value);
  }

  heading: Signal<string> = signal('Add Employee');
  overlayRef: WritableSignal<PuiOverlayRef | null> = signal(null)
}
