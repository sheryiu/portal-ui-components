import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { eachDayOfInterval, endOfMonth, endOfWeek, getDate, getMonth, getYear, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { HoverableDirective, LayoutControlDirective } from 'portal-ui-ng';
import { map } from 'rxjs';

@Component({
  selector: 'demo-employee-calendar-monthly',
  standalone: true,
  imports: [
    LayoutControlDirective,
    HoverableDirective,
    DatePipe,
    NgClass,
  ],
  templateUrl: './employee-calendar-monthly.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class EmployeeCalendarMonthlyComponent {
  private route = inject(ActivatedRoute)
  private timestamp = toSignal(this.route.params.pipe(map(p => p['timestamp']), map(t => Number(t))))

  protected selectedTime = computed(() => {
    const t = this.timestamp();
    if (t != null && t != -1) {
      return new Date(t);
    }
    return new Date();
  })
  protected daysVisible = computed(() => {
    const t = this.selectedTime();
    if (t == null) return [];
    const today = new Date();
    const start = startOfWeek(startOfMonth(t), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(t), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end }).map(date => ({
      date,
      isLastMonth: (getMonth(date) < getMonth(t)) ? true : (getYear(date) < getYear(date)),
      isNextMonth: (getMonth(date) > getMonth(t)) ? true : (getYear(date) > getYear(date)),
      isStartOfMonth: getDate(date) == 1,
      isToday: isSameDay(date, today),
    }))
  })
}
