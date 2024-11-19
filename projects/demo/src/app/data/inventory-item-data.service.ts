import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, delay, first } from 'rxjs';
import { InventoryItem, InventoryItemContentType, InventoryItemStatus } from './inventory.types';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<InventoryItem[]>([]);

  private createMock(): InventoryItem {
    const netWeight = faker.helpers.rangeToNumber({ min: 250, max: 1500 });
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
      belongsTo: faker.string.nanoid(12),
      status: faker.helpers.enumValue(InventoryItemStatus),
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.list.next(Array(100)
      .fill(0)
      .map(() => {
        return this.createMock();
      })
      .sort((a, b) => b.arrivedAt.getTime() - a.arrivedAt.getTime()))
  }

  getList() {
    this.appRef.isStable.pipe(
      first(stable => stable),
      delay(1000),
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
