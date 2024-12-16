import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, delay, first } from 'rxjs';
import { InventoryShelf } from './inventory.types';

@Injectable({
  providedIn: 'root'
})
export class InventoryShelfDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<InventoryShelf[]>([]);

  private widthMap = new Map<string, number>();
  private depthMap = new Map<number, number>();
  private createMock(aisle: string, row: number, layer: number): InventoryShelf {
    const width = this.widthMap.has(aisle) ? this.widthMap.get(aisle)! : faker.helpers.rangeToNumber({ min: 1500, max: 3500 })
    this.widthMap.set(aisle, width)
    const depth = this.depthMap.has(row) ? this.depthMap.get(row)! : faker.helpers.rangeToNumber({ min: 1000, max: 2000 })
    this.depthMap.set(row, depth)
    return {
      id: faker.string.nanoid(),
      location: {
        row,
        aisle,
        layer,
      },
      isAllowFragileItems: faker.datatype.boolean(.25),
      maxCapacity: faker.helpers.rangeToNumber({ min: 10, max: 50 }) * 1000,
      dimensions: {
        width,
        depth,
        height: faker.helpers.rangeToNumber({ min: 1200, max: 5000 }),
      }
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    const list = [];
    for (let aisle = 'a'.charCodeAt(0); aisle <= 'k'.charCodeAt(0); aisle++) {
      for (let row = 1; row <= 8; row++) {
        const layers = faker.helpers.rangeToNumber({ min: 3, max: 6 })
        for (let layer = 0; layer < layers; layer++) {
          list.push(this.createMock(String.fromCharCode(aisle), row, layer))
        }
      }
    }
    this.list.next(list
      .sort((a, b) => a.location.layer - b.location.layer)
      .sort((a, b) => a.location.row - b.location.row)
      .sort((a, b) => a.location.aisle.charCodeAt(0) - b.location.aisle.charCodeAt(0)))
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

  save(data: InventoryShelf) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == data.id ? data : oldValue))
  }
}
