import { DatePipe, NgClass, SlicePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, getDate, getMonth, getYear, isSameDay, isWeekend, startOfMonth, startOfWeek, sub } from 'date-fns';
import { HoverableDirective } from 'portal-ui-ng/base';
import { LayoutControlDirective } from 'portal-ui-ng/pages';
import { map } from 'rxjs';
import { EmployeeCalendarEventDataService } from '../../../../data/employee-calendar-event-data.service';
import { EmployeeCalendarListService } from '../employee-calendar-list.service';
import { CalendarEventsComponent } from './calendar-events/calendar-events.component';

@Component({
  selector: 'demo-employee-calendar-monthly',
  imports: [
    LayoutControlDirective,
    HoverableDirective,
    DatePipe,
    NgClass,
    CalendarEventsComponent,
    SlicePipe,
  ],
  templateUrl: './employee-calendar-monthly.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class EmployeeCalendarMonthlyComponent {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private timestamp = toSignal(this.route.params.pipe(map(p => p['timestamp']), map(t => Number(t))))
  private dataService = inject(EmployeeCalendarEventDataService)
  private rawData = toSignal(this.dataService.getList())
  private listService = inject(EmployeeCalendarListService)

  protected selectedTime = computed(() => {
    const t = this.timestamp();
    if (t != null && t != -1) {
      return new Date(t);
    } else if (t == -1) {
      return new Date(this.listService.storedSelectedTime)
    }
    return new Date();
  })
  protected daysVisible = computed(() => {
    const selectedTime = this.selectedTime();
    if (selectedTime == null) return [];
    const today = new Date();
    const start = startOfWeek(startOfMonth(selectedTime), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(selectedTime), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end }).map(date => ({
      date,
      isLastMonth: (getMonth(date) < getMonth(selectedTime)) ? true : (getYear(date) < getYear(selectedTime)),
      isNextMonth: (getMonth(date) > getMonth(selectedTime)) ? true : (getYear(date) > getYear(selectedTime)),
      isStartOfMonth: getDate(date) == 1,
      isToday: isSameDay(date, today),
      isWeekend: isWeekend(date)
    }))
  })
  protected daysWithData = computed(() => {
    const days = this.daysVisible();
    const rawData = this.rawData() ?? [];
    return days.map((day) => {
      return {
        ...day,
        events: rawData.filter(event => isSameDay(event.startsFrom, day.date)).sort((a, b) => a.startsFrom.getTime() - b.startsFrom.getTime())
      }
    })
  })

  protected onNextMonthClick() {
    const selectedTime = this.selectedTime();
    const update = add(selectedTime, { months: 1 });
    this.listService.updateSelectedTime(update)
    this.router.navigate(['../', update.getTime()], { relativeTo: this.route })
  }

  protected onLastMonthClick() {
    const selectedTime = this.selectedTime();
    const update = sub(selectedTime, { months: 1 });
    this.listService.updateSelectedTime(update)
    this.router.navigate(['../', update.getTime()], { relativeTo: this.route })
  }

  protected onTodayClick() {
    const update = new Date();
    this.listService.updateSelectedTime(update)
    this.router.navigate(['../', update.getTime()], { relativeTo: this.route })
  }
}
