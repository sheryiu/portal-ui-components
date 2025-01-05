import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseButtonDirective } from 'portal-ui-ng/base';
import { EmployeeCalendarEvent } from '../../../../../data/user.types';

@Component({
  selector: 'demo-calendar-events',
  standalone: true,
  imports: [
    BaseButtonDirective,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './calendar-events.component.html',
  styles: ``,
  host: {
    class: 'contents'
  }
})
export class CalendarEventsComponent {
  events = input.required<EmployeeCalendarEvent[]>();
}
