import { DatePipe } from '@angular/common';
import { Component, computed, inject, InjectionToken, input } from '@angular/core';
import { TimeAgoPipe } from 'portal-ui-ng';

export type TimeDisplayFormatter = (date: Date, format: string) => string;
export const TIME_DISPLAY_FORMATTER = new InjectionToken<TimeDisplayFormatter>('TIME_DISPLAY_FORMATTER');

export function provideTimeDisplayFormatter(formatter: TimeDisplayFormatter) {
  return {
    provide: TIME_DISPLAY_FORMATTER,
    useValue: formatter
  }
}

@Component({
  selector: 'pui-time-display',
  imports: [
    DatePipe,
    TimeAgoPipe,
  ],
  templateUrl: `./time-display.component.html`,
  host: {
    class: 'pui-time-display'
  }
})
export class TimeDisplayComponent {
  private formatter = inject(TIME_DISPLAY_FORMATTER, { optional: true });
  _date = input.required<Date | string | number | null | undefined>({ alias: 'date' })
  mode = input<'normal' | 'timeAgo'>('normal')
  /**
   * Only applicable when mode = 'normal'
   */
  format = input<string>()

  usingCustomFormatter = computed(() => !!this.formatter)
  date = computed(() => {
    const date = this._date();
    if (date instanceof Date) {
      if (isNaN(date.getTime())) return null;
      return date;
    }
    if (typeof date == 'string') {
      if (isNaN(new Date(date).getTime())) return null;
      return new Date(date);
    }
    if (typeof date == 'number') {
      if (isNaN(new Date(date).getTime())) return null;
      return new Date(date);
    }
    return null
  })
  formattedDate = computed(() => {
    if (this.usingCustomFormatter() && !this.isInvalid() && !!this.format()) {
      return this.formatter!(this.date()!, this.format()!)
    }
    return null;
  })
  protected isInvalid = computed(() => {
    const date = this._date();
    if (date instanceof Date) {
      return isNaN(date.getTime())
    }
    if (typeof date == 'string') {
      return isNaN(new Date(date).getTime())
    }
    if (typeof date == 'number') {
      return isNaN(new Date(date).getTime())
    }
    return true;
  })
}