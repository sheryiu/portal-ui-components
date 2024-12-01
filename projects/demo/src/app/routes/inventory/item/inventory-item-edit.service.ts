import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, LayoutControlConfig, ObjectJsonSchema } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from '../../../data/inventory.types';

@Injectable()
export class InventoryItemEditService implements EditableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private list = toSignal(this.dataService.getList())

  params = signal<Params>({});
  data = signal(this.list()?.find(v => v.id == this.params()['id']));
  jsonSchema: Signal<ObjectJsonSchema> = signal<ObjectJsonSchema>({
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
