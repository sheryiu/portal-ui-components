import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';

@Component({
  selector: 'pui-time-display',
  standalone: true,
  imports: [
    DatePipe,
    TimeAgoPipe,
  ],
  templateUrl: `./time-display.component.html`
})
export class TimeDisplayComponent {
  @Input() date?: Date | null | undefined;
  @Input() mode?: 'normal' | 'timeAgo' = 'normal'
  /**
   * Only applicable when mode = 'normal'
   */
  @Input() format?: string;
}
