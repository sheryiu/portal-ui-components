import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, LayoutControlConfig, ObjectJsonSchema, PuiOverlayRef } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';

@Injectable()
export class CustomerAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);

  configuration = {
    content: EditableContentComponent,
  }

  // EditableContentDataProvider
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
  private updatedValue = signal<Customer | undefined>(undefined)

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
    this.updateState({ isDirty: true })
  }

  onValueChange(value: Customer): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'cancel': {
        this.data.set({} as any)
        this.overlayRef()?.close()
        break;
      }
      case 'save': {
        let updatedValue = this.updatedValue()
        if (updatedValue) {
          updatedValue = Object.assign(updatedValue, { id: faker.string.nanoid() })
          this.dataService.add(updatedValue);
          this.overlayRef()?.close()
        }
        break;
      }
    }
  }

  // ActionDrawerLayoutDataProvider
  heading: Signal<string> = signal('Add Customer');
  overlayRef: WritableSignal<PuiOverlayRef | null> = signal(null)
}
