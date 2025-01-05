import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfEditService implements EditableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);
  private list = toSignal(this.dataService.getList())
    private id = signal<string | undefined>(undefined)

  data = signal<InventoryShelf | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
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
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS
  });

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
    }, { allowSignalWrites: true })
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
        this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
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
