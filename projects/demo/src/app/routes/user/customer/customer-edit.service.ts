import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, ObjectJsonSchema } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';

@Injectable()
export class CustomerEditService implements EditableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
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
      username: {
        type: 'string',
        description: 'Username',
      },
      email: {
        type: 'string',
        description: 'Email',
      },
      phone: {
        type: 'string',
        description: 'Phone',
      },
      address: {
        type: 'object',
        description: 'Address',
        properties: {
          line1: {
            type: 'string',
            description: 'Line 1',
          },
          line2: {
            type: 'string',
            description: 'Line 2',
          },
          city: {
            type: 'string',
            description: 'City',
          },
          state: {
            type: 'string',
            description: 'State',
          },
          postalCode: {
            type: 'string',
            description: 'Postal Code',
          },
          country: {
            type: 'string',
            description: 'Country',
          }
        }
      },
      savedAddresses: {
        type: 'array',
        description: 'Saved Addresses',
        items: {
          type: 'object',
          description: 'Address',
          properties: {
            line1: {
              type: 'string',
              description: 'Line 1',
            },
            line2: {
              type: 'string',
              description: 'Line 2',
            },
            city: {
              type: 'string',
              description: 'City',
            },
            state: {
              type: 'string',
              description: 'State',
            },
            postalCode: {
              type: 'string',
              description: 'Postal Code',
            },
            country: {
              type: 'string',
              description: 'Country',
            }
          }
        }
      },
      registeredSince: {
        type: 'date-time',
        description: 'Registered Since'
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
  save(value: Customer): void {
    this.dataService.save(value)
    this.state.set({ isDirty: false })
  }

}
