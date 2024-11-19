import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, ObjectJsonSchema } from 'portal-ui-ng';
import { CustomerDataService } from '../../data/customer-data.service';
import { Customer } from '../../data/user.types';

@Injectable()
export class CustomerAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);

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
  cancel(): void {
    this.data.set({} as any)
  }
  save(value: Customer): void {
    value.id = faker.string.nanoid();
    this.dataService.add(value);
  }

  heading: Signal<string> = signal('Add Customer');
}
