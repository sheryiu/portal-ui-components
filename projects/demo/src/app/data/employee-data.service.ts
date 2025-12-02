import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { merge } from 'lodash-es';
import { BehaviorSubject, delay, first } from 'rxjs';
import { Employee, EmployeeDepartment, EmployeePosition, EmployeeStatus } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<Employee[]>([]);

  private createMock(): Employee {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const department = faker.helpers.enumValue(EmployeeDepartment)
    const status = faker.helpers.enumValue(EmployeeStatus)
    return {
      id: faker.string.nanoid(),
      name: faker.person.fullName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      department,
      position: department == EmployeeDepartment.SHIPPING
        ? faker.helpers.arrayElement([EmployeePosition.SHIPPING_AND_RECEIVING_CLERK])
        : department == EmployeeDepartment.MANAGEMENT
        ? faker.helpers.arrayElement([EmployeePosition.CEO, EmployeePosition.CFO, EmployeePosition.HR_MANAGER, EmployeePosition.WAREHOUSE_MANAGER])
        : faker.helpers.arrayElement([EmployeePosition.INTERN, EmployeePosition.WAREHOUSE_WORKER, EmployeePosition.WAREHOUSE_SUPERVISOR, EmployeePosition.FORKLIFT_OPERATOR, EmployeePosition.INVENTORY_CLERK]),
      dateOfJoining: faker.date.past({ years: 10 }),
      status,
      dateOfLeaving: [EmployeeStatus.TERMINATED, EmployeeStatus.RETIRED, EmployeeStatus.INACTIVE].includes(status) ? faker.date.past({ years: 1 }) : null,
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
      .sort((a, b) => a.dateOfJoining.getTime() - b.dateOfJoining.getTime()))
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

  save(id: string, data: Employee) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == id ? merge(oldValue, data) : oldValue))
  }

  add(data: Employee) {
    this.list.next(this.list.value.toSpliced(0, 0, data))
  }
}
