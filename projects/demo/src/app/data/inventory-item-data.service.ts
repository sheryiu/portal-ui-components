import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, combineLatest, delay, first } from 'rxjs';
import { CustomerDataService } from './customer-data.service';
import { InventoryShelfDataService } from './inventory-shelf-data.service';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus, InventoryShelf } from './inventory.types';
import { Customer } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemDataService {

  private appRef = inject(ApplicationRef);
  private customerData = inject(CustomerDataService)
  private inventoryShelfData = inject(InventoryShelfDataService)
  private list = new BehaviorSubject<InventoryItem[]>([]);

  private createMock(customers: Customer[], inventoryShelves: InventoryShelf[]): InventoryItem {
    const netWeight = faker.helpers.rangeToNumber({ min: 250, max: 1500 });
    const status = faker.helpers.enumValue(InventoryItemStatus)
    return {
      id: faker.string.nanoid(),
      netWeight,
      grossWeight: netWeight + faker.helpers.rangeToNumber({ min: 400, max: 800 }),
      contents: Array(faker.helpers.rangeToNumber({ min: 1, max: 3 })).fill(0).map(() => ({
        id: faker.string.nanoid(),
        type: faker.helpers.enumValue(InventoryItemContentType),
        description: faker.commerce.productName(),
        isbn: faker.helpers.maybe(() => faker.commerce.isbn()) ?? null,
        quantity: 1,
        totalPrice: faker.helpers.rangeToNumber({ min: 100, max: 2500 }) / 10,
      })),
      isContainFragile: faker.datatype.boolean(),
      arrivedAt: faker.date.past({ years: 1 }),
      belongsTo: faker.helpers.arrayElement(customers).id,
      status,
      locatedIn: status == InventoryItemStatus.EXPIRED
        ? null
        : faker.helpers.arrayElement(inventoryShelves).id
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    combineLatest([
      this.customerData.getList(),
      this.inventoryShelfData.getList(),
    ]).pipe(
      first(([d1, d2]) => d1.length > 0 && d2.length > 0)
    ).subscribe(([customers, inventoryShelves]) => {
      this.list.next(Array(100)
        .fill(0)
        .map(() => {
          return this.createMock(customers, inventoryShelves);
        })
      )
    })
  }

  getList() {
    this.appRef.isStable.pipe(
      first(stable => stable),
      delay(50),
    ).subscribe(() => {
      this.initialize();
    })
    return this.list;
  }

  save(data: InventoryItem) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == data.id ? data : oldValue))
  }

  add(data: InventoryItem) {
    this.list.next(this.list.value.toSpliced(0, 0, data))
  }
}
