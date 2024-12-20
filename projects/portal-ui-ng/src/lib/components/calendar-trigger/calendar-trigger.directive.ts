import { DestroyRef, Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PuiOverlayRef, PuiOverlayService } from '../../base';
import { CalendarOverlayComponent } from './calendar-overlay/calendar-overlay.component';

@Directive({
  selector: '[puiCalendarTrigger]',
  standalone: true
})
export class CalendarTriggerDirective {
  private overlay = inject(PuiOverlayService);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private destroyRef = inject(DestroyRef)

  date = input<Date | null | undefined>();
  dateChange = output<Date>();
  private overlayRef?: PuiOverlayRef;

  @HostListener('click')
  openOverlay() {
    if (this.overlayRef) {
      this.overlayRef.close();
      this.overlayRef = undefined;
      return;
    }
    this.overlayRef = this.overlay.open(
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
    this.overlayRef.afterClosed$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.overlayRef = undefined;
    })
  }

}
