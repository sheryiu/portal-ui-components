import { inject, Injectable, signal, Signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { PuiOverlayRef } from 'portal-ui-ng/base';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, LayoutControlConfig, ObjectFieldConfiguration, } from 'portal-ui-ng/pages';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from '../../../data/inventory.types';

@Injectable()
export class InventoryItemAddService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);

  configuration = {
    content: EditableContentComponent,
    isEnterToSubmit: true,
  };

  // EditableContentDataProvider
  data = signal(null);
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
  private updatedValue = signal<InventoryItem | undefined>(undefined)

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
    this.updateState({ isDirty: true })
  }

  onValueChange(value: InventoryItem): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'cancel': {
        this.data.set({} as any)
        this.overlayRef.close()
        break;
      }
      case 'save': {
        let updatedValue = this.updatedValue()
        if (updatedValue) {
          updatedValue = Object.assign(updatedValue, {
            id: faker.string.nanoid(),
            contents: updatedValue.contents.map(c => Object.assign(c, { id: faker.string.nanoid(12) }))
          })
          this.dataService.add(updatedValue);
          this.overlayRef.close()
        }
        break;
      }
    }
  }

  // ActionDrawerLayoutDataProvider
  private overlayRef!: PuiOverlayRef;
  heading: Signal<string> = signal('Add Item');
  onActionDrawerInit(overlayRef: PuiOverlayRef): void {
    this.overlayRef = overlayRef;
  }
}
