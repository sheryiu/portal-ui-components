import { effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, ObjectJsonSchema } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from '../../data/inventory.types';

@Injectable()
export class InventoryItemEditService implements EditableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private list = toSignal(this.dataService.getList())

  configuration = {
    hasRefreshControl: true,
  }

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
  save(value: InventoryItem): void {
    this.dataService.save(value)
    this.state.set({ isDirty: false })
  }
}
