import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, ObjectJsonSchema, PuiOverlayRef } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from '../../../data/inventory.types';

@Injectable()
export class InventoryItemAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);

  configuration = {
    content: EditableContentComponent,
    hasRefreshControl: false,
  };

  // EditableContentDataProvider
  data = signal(null);
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
  state: WritableSignal<{ isDisabled?: boolean; isDirty?: boolean; }> = signal({ isDirty: true });
  currentState: WritableSignal<{ isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }> = signal({});
  cancel(): void {
    this.data.set({} as any)
    this.overlayRef()?.close();
  }
  save(value: InventoryItem): void {
    value.id = faker.string.nanoid();
    value.contents?.forEach(content => {
      content.id = faker.string.nanoid(12)
    })
    this.dataService.add(value);
  }

  // ActionDrawerLayoutDataProvider
  heading: Signal<string> = signal('Add Item');
  overlayRef: WritableSignal<PuiOverlayRef | null> = signal(null)
}
