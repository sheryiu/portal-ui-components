import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { cloneDeep } from 'lodash-es';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from '../../../data/inventory.types';

@Injectable()
export class InventoryItemEditService implements EditableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)

  data = signal<InventoryItem | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      netWeight: {
        type: 'number',
        description: 'Net Weight (grams)',
      },
      grossWeight: {
        type: 'number',
        description: 'Gross Weight (grams)'
      },
      isContainFragile: {
        type: 'boolean',
        description: 'Contains Fragile Contents'
      },
      arrivedAt: {
        type: 'date-time',
        description: 'Arrival Time'
      },
      belongsTo: {
        type: 'string',
        description: 'User'
      },
      status: {
        type: 'string',
        enum: Object.values(InventoryItemStatus),
        description: 'Status'
      },
      contents: {
        type: 'array',
        description: 'Content',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID',
            },
            description: {
              type: 'string',
              description: 'Description'
            },
            isbn: {
              type: 'string',
              description: 'ISBN',
            },
            type: {
              type: 'string',
              description: 'Type',
              enum: Object.values(InventoryItemContentType),
            },
            quantity: {
              type: 'number',
              description: 'Quantity',
            },
            totalPrice: {
              type: 'number',
              description: 'Total Price ($)',
            }
          }
        }
      }
    }
  });
  private isDirty = signal(false)
  private updatedValue = signal<InventoryItem | undefined>(undefined)
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
  onValueChange(value: InventoryItem): void {
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
