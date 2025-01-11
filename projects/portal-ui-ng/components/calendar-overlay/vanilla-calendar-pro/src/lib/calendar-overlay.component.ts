import { Component, DestroyRef, effect, ElementRef, inject, makeEnvironmentProviders, Signal, viewChild } from '@angular/core';
import { OVERLAY_DATA } from 'portal-ui-ng/base';
import { CALENDAR_OVERLAY_COMPONENT, CalendarOverlayData } from 'portal-ui-ng/components';
import { Calendar } from 'vanilla-calendar-pro';

@Component({
  selector: 'pui-calendar-overlay',
  standalone: true,
  imports: [],
  template: `
    <div #calendar></div>
  `,
  host: {
    class: 'pui-calendar-overlay pui-vanilla-calendar-pro'
  }
})
export class CalendarOverlayComponent {
  private data = inject(OVERLAY_DATA) as CalendarOverlayData;
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

export function provideVanillaCalendarProCalendarOverlay() {
  return makeEnvironmentProviders([
    {
      provide: CALENDAR_OVERLAY_COMPONENT,
      useValue: () => CalendarOverlayComponent,
    }
  ])
}