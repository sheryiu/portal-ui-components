import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';

@Injectable()
export class CustomerEditService implements EditableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  data = signal<Customer | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
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
        description: 'Saved Address',
        items: {
          type: 'object',
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
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS
  });

  constructor() {
    effect(() => {
      this.data.set(cloneDeep(this.list()?.find(v => v.id == this.id())))
    })
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
        this.data.set(cloneDeep(this.list()?.find(v => v.id == this.id())))
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
