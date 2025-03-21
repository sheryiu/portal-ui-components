import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { AccessControlDataService } from '../../../data/access-control-data.service';
import { AccessControl } from '../../../data/user.types';

const Permission: ObjectFieldConfiguration = {
  type: 'object',
  properties: {
    canCreate: {
      type: 'boolean',
      description: 'Can Create'
    },
    canRead: {
      type: 'boolean',
      description: 'Can Read'
    },
    canUpdate: {
      type: 'boolean',
      description: 'Can Update'
    },
    canDelete: {
      type: 'boolean',
      description: 'Can Delete'
    },
  }
}

@Injectable()
export class AccessControlEditService implements EditableContentDataProvider<AccessControl> {
  private dataService = inject(AccessControlDataService)
  private list = toSignal(this.dataService.getList())
    private id = signal<string | undefined>(undefined)

  data = signal<AccessControl | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      userNumber: {
        description: 'User number',
        type: 'string',
      },
      employeeId: {
        description: 'Employee ID',
        type: 'string',
      },
      isEnabled: {
        description: 'Enabled',
        type: 'boolean',
      },
      permissions: {
        description: 'Permissions',
        type: 'object',
        properties: {
          customer: {
            description: 'Customer',
            ...Permission
          },
          employee: {
            description: 'Employee',
            ...Permission
          },
          inventoryItem: {
            description: 'Inventory Item',
            ...Permission
          },
        }
      },
      conditions: {
        description: 'Conditions',
        type: 'object',
        properties: {
          location: {
            description: 'Location-Based',
            type: 'object',
            properties: {
              isEnabled: {
                type: 'boolean',
                description: 'Enabled',
              },
              allowedIps: {
                type: 'array',
                description: 'Allowed IPs',
                items: {
                  type: 'string',
                }
              },
              countries: {
                type: 'array',
                description: 'Countries',
                items: {
                  type: 'string',
                }
              },
            }
          },
          timeRange: {
            description: 'Time-Based',
            type: 'object',
            properties: {
              isEnabled: {
                type: 'boolean',
                description: 'Enabled',
              },
              allowedAfter: {
                description: 'Allowed After (HHmm)',
                type: 'string',
              },
              allowedBefore: {
                description: 'Allowed Before (HHmm)',
                type: 'string',
              },
            }
          }
        }
      }
    }
  });
  private isDirty = signal(false)
  private updatedValue = signal<AccessControl | undefined>(undefined)
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
  onValueChange(value: AccessControl): void {
    this.updatedValue.set(value)
  }
  onControlClick?(key: string, event: MouseEvent): void {
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
