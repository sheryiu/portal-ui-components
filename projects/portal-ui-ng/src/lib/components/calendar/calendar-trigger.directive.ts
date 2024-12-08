import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';
import { PuiOverlayService } from '../../base';
import { CalendarOverlayComponent } from './calendar-overlay/calendar-overlay.component';

@Directive({
  selector: '[puiCalendarTrigger]',
  standalone: true
})
export class CalendarTriggerDirective {
  private overlay = inject(PuiOverlayService);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;

  date = input<Date | null | undefined>();
  dateChange = output<Date>();

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['date'] && this.date) {
  //     const date = (this.date instanceof Date) ? this.date : new Date(this.date);
  //     if (changes['date'].isFirstChange()) {
  //       this.calendar = new Calendar(this.elementRef.nativeElement, {
  //         type: 'default',
  //         inputMode: false,
  //         selectedDates: [date],
  //         selectedTime: '',
  //         selectionTimeMode: 24,
  //         enableJumpToSelectedDate: true,
  //         onChangeToInput: (self, event) => {
  //           const date = new Date(self.context.selectedDates[0]);
  //           console.log(date)
  //           // if (self.selectedHours != null && self.selectedMinutes != null) {
  //           //   if (self.selectedKeeping) {
  //           //     // 12 hour format
  //           //     date.setHours(self.selectedKeeping == 'AM' ? Number(self.selectedHours) : (Number(self.selectedHours) + 12))
  //           //   } else {
  //           //     date.setHours(Number(self.selectedHours))
  //           //   }
  //           //   date.setMinutes(Number(self.selectedMinutes))
  //           // }
  //           // this.dateChange.emit(date);
  //         },
  //         onChangeTime: (self, event) => {
  //           console.log(self.context.selectedTime)
  //         }
  //       });
  //       this.calendar?.init();
  //     }
  //   }
  // }

  @HostListener('click')
  openOverlay() {
    this.overlay.open(
      CalendarOverlayComponent,
      {
        positionStrategy: this.overlay.position().flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions([
            { originX: 'start', overlayX: 'start', originY: 'bottom', overlayY: 'top', offsetY: 8 },
            { originX: 'start', overlayX: 'start', originY: 'top', overlayY: 'bottom', offsetY: -8 },
            { originX: 'end', overlayX: 'end', originY: 'bottom', overlayY: 'top', offsetY: 8 },
            { originX: 'end', overlayX: 'end', originY: 'top', overlayY: 'bottom', offsetY: -8 },
          ])
          .withViewportMargin(16)
          .withPush(true),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        disposeOnNavigation: true,
        data: {
          date: this.date(),
          onDateChange: (date: Date) => this.dateChange.emit(date),
        }
      }
    )
  }

}
