import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, LayoutControlConfig, ObjectJsonSchema } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';

@Injectable()
export class CustomerEditService implements EditableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
  private list = toSignal(this.dataService.getList())

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
  private isDirty = signal(false)
  private updatedValue = signal<Customer | undefined>(undefined)
  controlsConfig = computed<LayoutControlConfig[]>(() => {
    if (this.isDirty()) return [
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
    ]
    else return [
      {
        id: 'refresh',
        label: 'Refresh',
        icon: 'refresh',
        mode: 'low-emphasis'
      }
    ]
  });

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    }, { allowSignalWrites: true })
  }

  refresh(): void {
    this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    this.updateState!({ isDirty: false })
  }
  cancel(): void {
    this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
    this.updateState!({ isDirty: false })
  }
  save(value: Customer): void {
    this.dataService.save(value)
    this.updateState!({ isDirty: false })
  }

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
  }

  onStateChange(state: { isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }): void {
    this.isDirty.update(curr => state.isDirty ?? curr)
  }
  onValueChange(value: Customer): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'refresh':
      case 'cancel': {
        this.data.set(structuredClone(this.list()?.find(v => v.id == this.params()['id'])))
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

}
