import { effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EditableContentDataProvider, ObjectJsonSchema } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfEditService implements EditableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);
  private list = toSignal(this.dataService.getList())

  configuration = {
    hasRefreshControl: true,
  }

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
  save(value: InventoryShelf): void {
    this.dataService.save(value)
    this.state.set({ isDirty: false })
  }
}
