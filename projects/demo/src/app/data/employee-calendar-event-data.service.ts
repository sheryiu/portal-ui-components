import { ApplicationRef, inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { merge } from 'lodash-es';
import { BehaviorSubject, delay, first } from 'rxjs';
import { EmployeeDataService } from './employee-data.service';
import { Employee, EmployeeCalendarEvent, EmployeeCalendarEventType } from './user.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarEventDataService {
  private appRef = inject(ApplicationRef);
  private list = new BehaviorSubject<EmployeeCalendarEvent[]>([]);
  private employeeData = inject(EmployeeDataService);

  private createMock(employee: Employee): EmployeeCalendarEvent {
    const startsFrom = faker.date.past({ years: 1 });
    const endsAt = faker.date.between({ from: startsFrom, to: new Date(startsFrom.getTime() + 5 * 24 * 3600_000) });
    const type = faker.helpers.arrayElement([EmployeeCalendarEventType.ANNUAL_LEAVE, EmployeeCalendarEventType.BUSINESS_TRIP, EmployeeCalendarEventType.PERSONAL_LEAVE, EmployeeCalendarEventType.SICK_LEAVE]);
    return {
      id: faker.string.nanoid(),
      employeeId: employee.id,
      startsFrom,
      endsAt,
      isFullDay: [EmployeeCalendarEventType.ANNUAL_LEAVE, EmployeeCalendarEventType.PERSONAL_LEAVE, EmployeeCalendarEventType.SICK_LEAVE].includes(type),
      type,
      label: faker.lorem.lines(1),
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
        .map((e) => this.createMock(e)))
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

  save(id: string, data: EmployeeCalendarEvent) {
    this.list.next(this.list.value.map(oldValue => oldValue.id == id ? merge(oldValue, data) : oldValue))
  }
}
