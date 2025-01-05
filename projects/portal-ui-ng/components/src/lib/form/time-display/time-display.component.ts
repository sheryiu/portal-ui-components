import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TimeAgoPipe } from 'portal-ui-ng';

@Component({
  selector: 'pui-time-display',
  standalone: true,
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

  protected isInvalid = computed(() => isNaN(this.date()?.getTime()!))
}