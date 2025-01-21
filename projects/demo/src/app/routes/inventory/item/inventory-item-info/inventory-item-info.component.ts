import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isNonNull } from 'portal-ui-ng';
import { ButtonModule, HoverableDirective } from 'portal-ui-ng/base';
import { DividerComponent, TableModule, TimeDisplayComponent } from 'portal-ui-ng/components';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, LayoutControlDirective, TABLE_CONTENT_DATA_PROVIDER } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { CustomerDataService } from '../../../../data/customer-data.service';
import { InventoryItemDataService } from '../../../../data/inventory-item-data.service';
import { InventoryShelfDataService } from '../../../../data/inventory-shelf-data.service';
import { InventoryItemStatus } from '../../../../data/inventory.types';
import { Customer } from '../../../../data/user.types';
import { CustomerPickerService } from '../../../user/customer/customer-picker.service';

@Component({
  selector: 'demo-inventory-item-info',
  standalone: true,
  imports: [
    HoverableDirective,
    RouterLink,
    LayoutControlDirective,
    TimeDisplayComponent,
    DividerComponent,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './inventory-item-info.component.html',
  styles: ``,
  host: {
    class: 'contents'
  },
})
export class InventoryItemInfoComponent {
  private dataService = inject(InventoryItemDataService)
  private customerDataService = inject(CustomerDataService)
  private inventoryShelfService = inject(InventoryShelfDataService)
  private route = inject(ActivatedRoute)
  private actionDrawer = inject(ActionDrawerOverlayService)
  private list = toSignal(this.dataService.getList())
  private customerList = toSignal(this.customerDataService.getList())
  private inventoryShelfList = toSignal(this.inventoryShelfService.getList())
  private id = toSignal(this.route.params.pipe(map(p => p['id'])))

  inventoryItem = computed(() => {
    return this.list()?.find(i => i.id == this.id());
  })
  customer = computed(() => {
    return this.customerList()?.find(c => c.id == this.inventoryItem()?.belongsTo)
  })
  shelf = computed(() => {
    return this.inventoryShelfList()?.find(s => s.id == this.inventoryItem()?.locatedIn)
  })
  showEditButton = computed(() => {
    return [InventoryItemStatus.OPEN, InventoryItemStatus.REPACKAGING].includes(this.inventoryItem()?.status!)
  })
  isEditing = signal(false)
  updatedValues = signal({} as { customer: Customer | null })

  onEditClick() {
    this.isEditing.set(true)
    this.updatedValues.set({
      customer: null
    })
  }
  onCancelClick() {
    this.isEditing.set(false)
    this.updatedValues.set({
      customer: null
    })
  }
  onSaveClick() {
    this.dataService.save({
      ...this.inventoryItem()!,
      belongsTo: this.updatedValues().customer?.id ?? this.inventoryItem()!.belongsTo,
    })
    this.isEditing.set(false)
    this.updatedValues.set({
      customer: null
    })
  }
  onUpdateCustomerClick() {
    this.actionDrawer.open(
      CustomerPickerService,
      {
        providers: [{
          provide: TABLE_CONTENT_DATA_PROVIDER,
          useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
        }],
        overlayData: {
          initialValue: new Set([this.updatedValues().customer ?? this.customer()].filter(isNonNull)),
          onSave: (customer: Customer) => {
            this.updatedValues.update(old => ({
              ...old,
              customer: customer,
            }))
          }
        }
      }
    )
  }
}
