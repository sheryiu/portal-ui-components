import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule, ColumnConfig, DividerComponent, TABLE_CONTENT_DATA_PROVIDER, TableContentComponent, TableContentDataProvider, TimeDisplayComponent } from "portal-ui-ng";
import { map } from 'rxjs';
import { CustomerDataService } from '../../../../data/customer-data.service';
import { InventoryItemDataService } from '../../../../data/inventory-item-data.service';
import { InventoryItem, InventoryItemStatus } from '../../../../data/inventory.types';

@Component({
  selector: 'demo-customer-info',
  standalone: true,
  imports: [TimeDisplayComponent, DividerComponent, TableContentComponent, ButtonModule, NgClass],
  templateUrl: './customer-info.component.html',
  styles: `
  ::ng-deep .pui-table-content main {
    @apply bg-transparent backdrop-filter-none shadow-none;
    @apply px-0;
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
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'netWeight',
      label: 'Net Weight (g)',
      jsonSchema: {
        type: 'number',
      }
    },
    {
      key: 'grossWeight',
      label: 'Gross Weight (g)',
      jsonSchema: {
        type: 'number',
      }
    },
    {
      key: 'isContainFragile',
      label: 'Fragile',
      jsonSchema: {
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
      jsonSchema: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay = signal([
    'netWeight', 'grossWeight', 'isContainFragile', 'status', 'arrivedAt'
  ]);
  routeToDetail(item: InventoryItem) {
    return ['/', 'inventory', 'item', 'detail', item.id]
  }
  controlsConfig = signal([])
}
