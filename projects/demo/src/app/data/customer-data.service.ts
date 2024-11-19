import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, delay, first } from 'rxjs';
import { Customer } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<Customer[]>([]);

  private createMock(): Customer {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    return {
      id: faker.string.nanoid(),
      name: faker.person.fullName({ firstName, lastName }),
      username: faker.helpers.maybe(() => faker.internet.userName({ firstName, lastName })) ?? faker.internet.userName(),
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      address: {
        line1: faker.location.secondaryAddress(),
        line2: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postalCode: faker.location.zipCode(),
      },
      savedAddresses: [],
      registeredSince: faker.date.past({ years: 9 }),
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
      .sort((a, b) => b.registeredSince.getTime() - a.registeredSince.getTime()))
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

  save(data: Customer) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == data.id ? data : oldValue))
  }

  add(data: Customer) {
    this.list.next(this.list.value.toSpliced(0, 0, data))
  }
}
