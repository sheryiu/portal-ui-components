import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Address } from '../../../data/user.types';

@Injectable()
export class CustomerAddressEditService implements EditableContentDataProvider<Address> {
  private dataService = inject(CustomerDataService);
  private list = toSignal(this.dataService.getList())
  private id = signal<string | undefined>(undefined)
  private index = signal<string | undefined>(undefined)

  data = signal<Address | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
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
  });
  private isDirty = signal(false)
  private updatedValue = signal<Address | undefined>(undefined)
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS
  });

  constructor() {
    effect(() => {
      this.data.set(structuredClone(
        this.list()
          ?.find(v => v.id == this.id())
          ?.savedAddresses
          .at(Number(this.index()))
      ))
    }, { allowSignalWrites: true })
  }

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
  }

  onStateChange(state: { isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }): void {
    this.isDirty.update(curr => state.isDirty ?? curr)
  }
  onValueChange(value: Address): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'refresh':
      case 'cancel': {
        this.data.set(structuredClone(
          this.list()
            ?.find(v => v.id == this.id())
            ?.savedAddresses
            .at(Number(this.index()))
        ))
        this.updateState!({ isDirty: false })
        break;
      }
      case 'save': {
        const updatedValue = this.updatedValue()
        if (updatedValue) {
          this.dataService.updateAddress(this.id()!, Number(this.index()), updatedValue)
          this.updateState!({ isDirty: false })
        }
        break;
      }
    }
  }
  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
    this.index.set(params['index'])
  }
}
