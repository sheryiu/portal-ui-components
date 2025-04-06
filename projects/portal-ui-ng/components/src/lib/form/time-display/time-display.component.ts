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
  date = input.required<Date | null | undefined>()
  mode = input<'normal' | 'timeAgo'>('normal')
  /**
   * Only applicable when mode = 'normal'
   */
  format = input<string>()

  protected isInvalid = computed(() => this.date() instanceof Date ? isNaN(this.date()?.getTime()!) : true)
}