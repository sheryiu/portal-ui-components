import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { EmployeeDataService } from '../../../data/employee-data.service';
import { Employee, EmployeeDepartment, EmployeePosition, EmployeeStatus } from '../../../data/user.types';

@Injectable()
export class EmployeeEditService implements EditableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  data = signal<Employee | undefined>(undefined);
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
  private isDirty = signal(false)
  private updatedValue = signal<Employee | undefined>(undefined)
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS
  });

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
    })
  }

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
  }

  onStateChange(state: { isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }): void {
    this.isDirty.update(curr => state.isDirty ?? curr)
  }
  onValueChange(value: Employee): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'refresh':
      case 'cancel': {
        this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
        this.updateState!({ isDirty: false })
        break;
      }
      case 'save': {
        const updatedValue = this.updatedValue()
        if (updatedValue) {
          this.dataService.save(updatedValue)
          this.updateState!({ isDirty: false })
        }
        break;
      }
    }
  }
  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }

}
