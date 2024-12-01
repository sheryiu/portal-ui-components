import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, LayoutControlConfig, ObjectJsonSchema } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfEditService implements EditableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);
  private list = toSignal(this.dataService.getList())

  params = signal<Params>({});
  data = signal(this.list()?.find(v => v.id == this.params()['id']));
  jsonSchema: Signal<ObjectJsonSchema> = signal<ObjectJsonSchema>({
    type: 'object',
    properties: {
      location: {
        type: 'object',
        description: 'Shelf Location',
        properties: {
          aisle: {
            type: 'string',
            description: 'Aisle'
          },
          row: {
            type: 'number',
            description: 'Row',
          },
          layer: {
            type: 'number',
            description: 'Layer'
          }
        }
      },
      maxCapacity: {
        type: 'number',
        description: 'Maximum Capacity (grams)'
      },
      isAllowFragileItems: {
        type: 'boolean',
        description: 'Allows Fragile Items Inside'
      },
      dimensions: {
        type: 'object',
        description: 'Dimension',
        properties: {
          width: {
            type: 'number',
            description: 'Width (millimeters)',
          },
          depth: {
            type: 'number',
            description: 'Depth (millimeters)',
          },
          height: {
            type: 'number',
            description: 'Height (millimeters)',
          },
        }
      }
    }
  });
  private isDirty = signal(false)
  private updatedValue = signal<InventoryShelf | undefined>(undefined)
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
  save(value: InventoryShelf): void {
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
  onValueChange(value: InventoryShelf): void {
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
