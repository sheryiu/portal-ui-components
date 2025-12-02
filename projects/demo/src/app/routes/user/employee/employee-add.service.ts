import { inject, Injectable, Signal, signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { PuiOverlayRef } from 'portal-ui-ng/base';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, LayoutControlConfig, ObjectFieldConfiguration, } from 'portal-ui-ng/pages';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { Employee, EmployeeDepartment, EmployeePosition, EmployeeStatus } from '../../../data/user.types';

@Injectable()
export class EmployeeAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);

  configuration = {
    content: EditableContentComponent,
    isEnterToSubmit: true,
  }

  // EditableContentDataProvider
  data = signal(null);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
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
  controlsConfig = signal<LayoutControlConfig[]>([
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'close',
      mode: 'low-emphasis'
    },
    {
      id: 'save',
      label: 'Save',
      icon: 'save'
    }
  ]);
  private updatedValue = signal<Employee | undefined>(undefined)

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
    this.updateState({ isDirty: true })
  }

  onValueChange(value: Employee): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'cancel': {
        this.data.set({} as any)
        this.overlayRef.close()
        break;
      }
      case 'save': {
        let updatedValue = this.updatedValue()
        if (updatedValue) {
          updatedValue = Object.assign(updatedValue, { id: faker.string.nanoid() })
          this.dataService.add(updatedValue);
          this.overlayRef.close()
        }
        break;
      }
    }
  }

  // ActionDrawerLayoutDataProvider
  private overlayRef!: PuiOverlayRef;
  heading: Signal<string> = signal('Add Employee');
  onActionDrawerInit(overlayRef: PuiOverlayRef): void {
    this.overlayRef = overlayRef;
  }
}
