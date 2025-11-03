import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule, InputFieldComponent } from 'portal-ui-ng/base';
import { FormDisplayModule, TimeDisplayComponent, TooltipDirective } from 'portal-ui-ng/components';
import { ActionDrawerOverlayService, ColumnConfig, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, TableContentDataProvider } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { CustomerDataService } from '../../../../data/customer-data.service';
import { InventoryItemDataService } from '../../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemStatus } from '../../../../data/inventory.types';
import { MediaManagerPickerService } from '../../../media/media-manager/media-manager-picker/media-manager-picker.service';

@Component({
  selector: 'demo-customer-info',
  imports: [TimeDisplayComponent, TableContentComponent, ButtonModule, NgClass, TooltipDirective, FormDisplayModule, InputFieldComponent],
  templateUrl: './customer-info.component.html',
  styles: `
  ::ng-deep demo-customer-info .pui-table-content main {
    @apply bg-transparent backdrop-filter-none shadow-none px-0;
  }
  `,
  host: {
    class: 'contents'
  },
  providers: [
    {
      provide: TABLE_CONTENT_DATA_PROVIDER,
      useExisting: forwardRef(() => CustomerInfoComponent)
    }
  ]
})
export class CustomerInfoComponent implements TableContentDataProvider<InventoryItem> {
  private dataService = inject(CustomerDataService)
  private inventoryItemService = inject(InventoryItemDataService)
  private route = inject(ActivatedRoute)
  private list = toSignal(this.dataService.getList())
  private id = toSignal(this.route.params.pipe(map(p => p['id'])))
  private allInventoryItems = toSignal(this.inventoryItemService.getList())
  private actionDrawer = inject(ActionDrawerOverlayService)

  customer = computed(() => {
    return this.list()?.find(c => c.id == this.id());
  })

  inventoryItems = computed(() => {
    return this.allInventoryItems()?.filter(item => item.belongsTo == this.customer()?.id) ?? []
  });
  awaitingPaymentsCount = computed(() => this.inventoryItems()?.filter(i => i.status == InventoryItemStatus.OPEN).length)
  repackageCount = computed(() => this.inventoryItems()?.filter(i => i.status == InventoryItemStatus.REPACKAGING).length)
  data = computed(() => {
    return this.inventoryItems().slice(0, 5)
  })
  configuration = {
    id: 'customer-info-table',
  }
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'netWeight',
      label: 'Net Weight (g)',
      fieldConfiguration: {
        type: 'number',
      }
    },
    {
      key: 'grossWeight',
      label: 'Gross Weight (g)',
      fieldConfiguration: {
        type: 'number',
      }
    },
    {
      key: 'isContainFragile',
      label: 'Fragile',
      fieldConfiguration: {
        type: 'boolean',
      }
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'arrivedAt',
      label: 'Arrived',
      isAlignEnd: true,
      isSortedDesc: true,
      fieldConfiguration: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay = signal({
    default: ['netWeight', 'status'],
    768: ['netWeight', 'status', 'arrivedAt'],
    1280: ['netWeight', 'grossWeight', 'isContainFragile', 'status', 'arrivedAt']
  });
  routeToDetail(item: InventoryItem) {
    return ['/', 'inventory', 'item', 'detail', item.id]
  }
  controlsConfig = signal([])

  isInfoEditing = signal(false)

  onProfilePicEdit() {
    this.actionDrawer.open(MediaManagerPickerService)
  }

  onInfoEdit() {
    this.isInfoEditing.update(v => !v)
  }
}
