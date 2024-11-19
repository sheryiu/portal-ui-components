import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, ObjectJsonSchema } from 'portal-ui-ng';
import { EmployeeDataService } from '../../data/employee-data.service';
import { Employee, EmployeeDepartment, EmployeePosition, EmployeeStatus } from '../../data/user.types';

@Injectable()
export class EmployeeEditService implements EditableContentDataProvider<Employee> {
  private dataService = inject(EmployeeDataService);
  private list = toSignal(this.dataService.getList())

  configuration = {
    hasRefreshControl: true,
  }

  params = signal<Params>({})
  queryParams = signal<Params>({})
  data = signal(this.list()?.find(v => v.id == this.params()['id']));
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
  state: WritableSignal<{ isDisabled?: boolean; isDirty?: boolean; }> = signal({});
  currentState: WritableSignal<{ isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }> = signal({});

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    }, { allowSignalWrites: true })
  }

  refresh(): void {
    this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    this.state.set({ isDirty: false })
  }
  cancel(): void {
    this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    this.state.set({ isDirty: false })
  }
  save(value: Employee): void {
    this.dataService.save(value)
    this.state.set({ isDirty: false })
  }

}
