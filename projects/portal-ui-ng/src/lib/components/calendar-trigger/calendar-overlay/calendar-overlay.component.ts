import { Component, DestroyRef, effect, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { Calendar } from 'vanilla-calendar-pro';
import { OVERLAY_DATA } from '../../../base';

@Component({
  selector: 'pui-calendar-overlay',
  standalone: true,
  imports: [],
  template: `
    <div #calendar></div>
  `,
  host: {
    class: 'pui-calendar-overlay'
  }
})
export class CalendarOverlayComponent {
  private data = inject(OVERLAY_DATA) as { date: Date | null | undefined; onDateChange: (date: Date) => void };
  private destroyRef = inject(DestroyRef);
  private calendar!: Calendar;

  private divElement: Signal<ElementRef<HTMLDivElement>> = viewChild.required('calendar')

  constructor() {
    const ref = effect(() => {
      const div = this.divElement();
      const date = this.data.date ? new Date(this.data.date) : null;
      if (div) {
        this.calendar = new Calendar(div.nativeElement, {
          type: 'default',
          selectedDates: date ? [`${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`] : undefined,
          selectedTime: date ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}` : undefined,
          enableJumpToSelectedDate: true,
          firstWeekday: 0,
          selectionTimeMode: 24,
          onChangeTime: (self, event) => {
            this.onChange()
          },
          onClickDate: (self, event) => {
            this.onChange()
          },
        })
        this.calendar.init()
      }
    }, { manualCleanup: true })
    this.destroyRef.onDestroy(() => {
      this.calendar.destroy()
      ref.destroy()
    })
  }

  private onChange() {
    this.data.onDateChange(new Date(`${this.calendar.context.selectedDates[0]} ${this.calendar.context.selectedTime}`)) // this gets converted to the selectedTime in local timezone
  }
}
