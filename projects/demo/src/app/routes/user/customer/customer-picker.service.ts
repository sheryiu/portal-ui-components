import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActionDrawerLayoutDataProvider, ColumnConfig, LayoutControlConfig, OVERLAY_DATA, PuiOverlayRef, TableContentComponent, TableContentDataProvider } from 'portal-ui-ng';
import { CustomerDataService } from '../../../data/customer-data.service';
import { Customer } from '../../../data/user.types';

@Injectable()
export class CustomerPickerService implements ActionDrawerLayoutDataProvider, TableContentDataProvider<Customer> {
  private dataService = inject(CustomerDataService)
  private overlayData = inject(OVERLAY_DATA) as {
    initialValue: Set<Customer>;
    onSave: (customer: Customer) => void;
  };

  configuration = {
    content: TableContentComponent,
    useVirtualScroll: false,
  }
  heading = signal('Pick customer');
  overlayRef = signal<PuiOverlayRef | null>(null);

  // table content
  onControlClick(key: string, event: MouseEvent): void {
    if (key == 'select') {
      this.overlayData?.onSave(this.selectedItems().values().next().value!)
      this.overlayRef()?.close();
    }
  }
  data = toSignal(this.dataService.getList(), { initialValue: [] })
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'name',
      label: 'Name',
      jsonSchema: {
        type: 'string'
      }
    },
    {
      key: 'phone',
      label: 'Phone',
      jsonSchema: {
        type: 'string'
      }
    },
  ])
  columnsToDisplay = signal(['name', 'phone']);
  selectionMode = signal('single' as const)
  selectedItems = signal(this.overlayData.initialValue);
  controlsConfig = computed<LayoutControlConfig[]>(() => [
    {
      id: 'select',
      label: this.selectedItems().size == 0 ? 'Select' : `Select ${this.selectedItems().values().next().value!.name}`,
      isDisabled: this.selectedItems().size == 0,
    }
  ]);
  compareFn(a: Customer, b: Customer): boolean {
    return a.id == b.id;
  }
}
