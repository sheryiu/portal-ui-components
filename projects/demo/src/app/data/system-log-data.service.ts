import { ApplicationRef, Injectable, inject } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, combineLatest, delay, first } from 'rxjs';
import { CustomerDataService } from './customer-data.service';
import { EmployeeDataService } from './employee-data.service';
import { SystemLog, SystemLogLevel } from './log.types';
import { Customer, Employee } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class SystemLogDataService {
  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<SystemLog[]>([]);
  private employeeData = inject(EmployeeDataService);
  private customerData = inject(CustomerDataService);

  private createMock(employee?: Employee, customer?: Customer): SystemLog {
    return {
      id: faker.string.nanoid(),
      timestamp: faker.date.recent({ days: 20 }),
      level: faker.helpers.enumValue(SystemLogLevel),
      message: faker.git.commitMessage(),
      context: faker.helpers.arrayElement(['access-control', 'customer', 'employee-calendar-event', 'employee', 'inventory-item', 'inventory-shelf']),
      employeeId: employee?.id ?? null,
      customerId: customer?.id ?? null,
      ipAddress: faker.helpers.maybe(() => faker.internet.ip()) ?? null,
      detail: '',
    }
  }

  private isInitialized = false;
  private initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    combineLatest([
      this.employeeData.getList().pipe(
        first(list => list.length > 0)
      ),
      this.customerData.getList().pipe(
        first(list => list.length > 0)
      ),
    ]).subscribe(([employees, customer]) => {
      this.list.next(Array(300)
        .fill(0)
        .map((_, i) => {
          const isCustomer = faker.datatype.boolean(0.7);
          return this.createMock(isCustomer ? undefined : faker.helpers.arrayElement(employees), isCustomer ? faker.helpers.arrayElement(customer) : undefined)
        }))
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
}
