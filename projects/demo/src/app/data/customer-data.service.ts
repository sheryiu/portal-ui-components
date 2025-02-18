import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, delay, first, timer } from 'rxjs';
import { Address, Customer } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<Customer[]>([]);
  private isLoading = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoading.asObservable();

  createMockAddress(): Customer['address'] {
    return {
      line1: faker.location.secondaryAddress(),
      line2: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
    }
  }

  private createMock(): Customer {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    return {
      id: faker.string.nanoid(),
      profile: {
        color: faker.color.colorByCSSColorSpace().map(v => v*255).join(' '),
        icon: faker.helpers.arrayElement(['pentagon', 'square', 'hexagon', 'shapes', 'stack', 'lightbulb', 'all_out'])
      },
      name: faker.person.fullName({ firstName, lastName }),
      username: faker.helpers.maybe(() => faker.internet.username({ firstName, lastName })) ?? faker.internet.username(),
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      address: this.createMockAddress(),
      savedAddresses: Array(faker.helpers.rangeToNumber({ min: 1, max: 6 })).fill(0).map(() => this.createMockAddress()),
      registeredSince: faker.date.past({ years: 9 }),
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.list.next(Array(300)
      .fill(0)
      .map(() => {
        return this.createMock();
      })
      .sort((a, b) => b.registeredSince.getTime() - a.registeredSince.getTime()))
    this.isLoading.next(false)
  }

  getList() {
    if (this.isLoading.value == true || this.list.value.length > 0) return this.list;
    this.isLoading.next(true)
    this.appRef.isStable.pipe(
      first(stable => stable),
      delay(1000),
    ).subscribe(() => {
      this.initialize();
    })
    return this.list;
  }

  refresh() {
    if (this.isLoading.value == true) return;
    this.isLoading.next(true)
    timer(1000).subscribe(() => {
      this.isInitialized = false;
      this.initialize()
    })
  }

  save(data: Customer) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == data.id ? data : oldValue))
  }

  updateAddress(id: string, index: number, address: Address) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == id
      ? { ...oldValue, savedAddresses: oldValue.savedAddresses.toSpliced(index, 1, address) }
      : oldValue))
  }

  add(data: Customer) {
    this.list.next(this.list.value.toSpliced(0, 0, data))
  }
}
