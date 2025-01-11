import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, effect, ElementRef, inject, input, PLATFORM_ID, Signal, viewChild } from '@angular/core';
import { eachDayOfInterval } from 'date-fns';
import { Calendar } from 'vanilla-calendar-pro';

@Component({
  selector: 'demo-system-log-calendar',
  standalone: true,
  imports: [],
  templateUrl: './system-log-calendar.component.html',
  styles: ``
})
export class SystemLogCalendarComponent {
  private destroyRef = inject(DestroyRef)
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  startDate = input.required<Date>()
  endDate = input.required<Date>()
  private calendar!: Calendar;
  private calendarDiv: Signal<ElementRef<HTMLDivElement>> = viewChild.required('calendar', { read: ElementRef })

  constructor() {
    if (this.isBrowser) {
      const ref = effect(() => {
        const div = this.calendarDiv();
        if (div.nativeElement) {
          this.calendar = new Calendar(div.nativeElement, {
            type: 'default',
            firstWeekday: 0,
            selectedDates: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }),
            disableAllDates: true,
            enableDates: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }),
            enableDateToggle: false,
          })
          this.calendar.init()
          ref.destroy()
        }
      }, { manualCleanup: true })
      this.destroyRef.onDestroy(() => {
        this.calendar.destroy()
        ref.destroy()
      })
    }
  }
}
