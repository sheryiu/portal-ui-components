import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import VanillaCalendar from 'vanilla-calendar-pro';
import { ISelected } from 'vanilla-calendar-pro/types';

@Directive({
  selector: '[coreCalendarTrigger]',
  standalone: true
})
export class CalendarTriggerDirective implements OnChanges {
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private calendar?: VanillaCalendar;

  @Input() date?: Date | string | null | undefined;
  @Output() dateChange = new EventEmitter<Date>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && this.date) {
      const date = (this.date instanceof Date) ? this.date : new Date(this.date);
      const selected = this.asVanillaCalendarSelected(date);
      if (changes['date'].isFirstChange()) {
        this.calendar = new VanillaCalendar(this.elementRef.nativeElement, {
          type: 'default',
          input: true,
          settings: {
            selected: {
              dates: selected.dates,
              month: selected.month,
              year: selected.year,
              time: selected.time,
            },
            selection: {
              time: 24,
            }
          },
          actions: {
            changeToInput: (e, self) => {
              const date = new Date(self.selectedDates[0]);
              if (self.selectedHours != null && self.selectedMinutes != null) {
                if (self.selectedKeeping) {
                  // 12 hour format
                  date.setHours(self.selectedKeeping == 'AM' ? Number(self.selectedHours) : (Number(self.selectedHours) + 12))
                } else {
                  date.setHours(Number(self.selectedHours))
                }
                date.setMinutes(Number(self.selectedMinutes))
              }
              this.dateChange.emit(date);
            }
          }
        });
        this.calendar?.init();
      }
    }
  }

  private asVanillaCalendarSelected(date: Date): ISelected {
    return {
      dates: [`${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, '0') }-${ date.getDate().toString().padStart(2, '0') }`],
      month: date.getMonth(),
      year: date.getFullYear(),
      time: `${ date.getHours().toString().padStart(2, '0') }:${ date.getMinutes().toString().padStart(2, '0') }`,
    }
  }

  @HostListener('click')
  openOverlay() {
    this.calendar?.show();
    setTimeout(() => {
      if (this.date) {
        const date = (this.date instanceof Date) ? this.date : new Date(this.date);
        const selected = this.asVanillaCalendarSelected(date);
        this.calendar!.settings.selected.dates = selected.dates;
        this.calendar!.settings.selected.month = selected.month;
        this.calendar!.settings.selected.year = selected.year;
        this.calendar!.settings.selected.time = selected.time;
        this.calendar!.update({
          dates: true,
          month: true,
          year: true,
          time: true,
        })
      }
    })
  }

}
