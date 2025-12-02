import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { merge } from 'lodash-es';
import { BehaviorSubject, delay, first } from 'rxjs';
import { EmployeeDataService } from './employee-data.service';
import { AccessControl, Employee, EmployeeStatus } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class AccessControlDataService {
  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<AccessControl[]>([]);
  private employeeData = inject(EmployeeDataService);

  private createMock(employee: Employee, index: number): AccessControl {
    return {
      id: faker.string.nanoid(),
      userNumber: String(index).padStart(4, '0'),
      employeeId: employee.id,
      isEnabled: (employee.status != EmployeeStatus.INACTIVE) && (employee.status != EmployeeStatus.TERMINATED) && (employee.status != EmployeeStatus.RETIRED),
      permissions: {
        customer: {
          canCreate: faker.datatype.boolean(),
          canRead: faker.datatype.boolean(),
          canUpdate: faker.datatype.boolean(),
          canDelete: faker.datatype.boolean(),
        },
        employee: {
          canCreate: faker.datatype.boolean(),
          canRead: faker.datatype.boolean(),
          canUpdate: faker.datatype.boolean(),
          canDelete: faker.datatype.boolean(),
        },
        inventoryItem: {
          canCreate: faker.datatype.boolean(),
          canRead: faker.datatype.boolean(),
          canUpdate: faker.datatype.boolean(),
          canDelete: faker.datatype.boolean(),
        },
      },
      conditions: {
        location: {
          isEnabled: faker.datatype.boolean(),
          allowedIps: Array(faker.helpers.rangeToNumber(5)).fill(0).map(() => faker.internet.ip()),
          countries: Array(faker.helpers.rangeToNumber(2)).fill(0).map(() => faker.location.country()),
        },
        timeRange: {
          isEnabled: faker.datatype.boolean(),
          allowedAfter: faker.helpers.maybe(() =>
            faker.helpers.rangeToNumber(23).toString().padStart(2, '0') + '00') ?? null,
          allowedBefore: faker.helpers.maybe(() =>
            faker.helpers.rangeToNumber(23).toString().padStart(2, '0') + '00') ?? null,
        }
      }
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.employeeData.getList().pipe(
      first(list => list.length > 0)
    ).subscribe(employees => {
      this.list.next(employees
        .map((e, i) => this.createMock(e, i)))
    })
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

  save(id: string, data: AccessControl) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == id ? merge(oldValue, data) : oldValue))
  }
}
