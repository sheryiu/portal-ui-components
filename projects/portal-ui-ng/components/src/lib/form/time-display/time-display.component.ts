import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TimeAgoPipe } from 'portal-ui-ng';

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
  _date = input.required<Date | string | number | null | undefined>({ alias: 'date' })
  mode = input<'normal' | 'timeAgo'>('normal')
  /**
   * Only applicable when mode = 'normal'
   */
  format = input<string>()

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