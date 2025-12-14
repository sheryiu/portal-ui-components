import { booleanAttribute, DestroyRef, Directive, ElementRef, inject, InjectionToken, input, output, Renderer2, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';

@Directive({
  selector: '[puiCalendarTrigger]',
  standalone: true,
  host: {
    '(click)': 'openOverlay()'
  }
})
export class CalendarTriggerDirective {
  private overlayComponent = inject(CALENDAR_OVERLAY_COMPONENT, { optional: true });
  private overlay = inject(PuiOverlayService);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef)

  date = input<string | Date | number | null | undefined>();
  dateOnly = input(false, { transform: booleanAttribute })
  dateChange = output<Date | null>();
  private overlayRef?: PuiOverlayRef;
  private dateElement?: HTMLInputElement;

  constructor() {
    this.destroyRef.onDestroy(() => {
      try {
        this.dateElement?.remove();
        this.dateElement = undefined;
      } catch (e) {}
      this.overlayRef?.close();
      this.overlayRef = undefined;
    })
  }

  openOverlay() {
    if (this.overlayRef) {
      this.overlayRef.close();
      this.overlayRef = undefined;
      return;
    }
    if (this.overlayComponent) {
      this.overlayRef = this.overlay.open(
        this.overlayComponent(),
        {
          positionStrategy: this.overlay.position().flexibleConnectedTo(this.elementRef.nativeElement)
            .withPositions([
              { originX: 'start', overlayX: 'start', originY: 'bottom', overlayY: 'top', offsetY: 8 },
              { originX: 'start', overlayX: 'start', originY: 'top', overlayY: 'bottom', offsetY: -8 },
              { originX: 'end', overlayX: 'end', originY: 'bottom', overlayY: 'top', offsetY: 8 },
              { originX: 'end', overlayX: 'end', originY: 'top', overlayY: 'bottom', offsetY: -8 },
            ])
            .withViewportMargin(16)
            .withFlexibleDimensions(true)
            .withPush(true),
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
          disposeOnNavigation: true,
          data: {
            date: this.date() ? new Date(this.date()!) : null,
            dateOnly: this.dateOnly(),
            onDateChange: (date: Date) => this.dateChange.emit(date),
          } as CalendarOverlayData
        }
      )
      this.overlayRef.afterClosed$.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.overlayRef = undefined;
      })
    } else {
      if (this.elementRef.nativeElement.parentElement) {
        this.dateElement = this.renderer.createElement('input') as HTMLInputElement;
        this.dateElement.type = this.dateOnly() ? 'date' : 'datetime-local';
        this.elementRef.nativeElement.insertAdjacentElement('afterend', this.dateElement);
        this.dateElement.style.width = '0px';
        this.dateElement.style.height = '0px';
        const date = this.date() ? new Date(this.date()!).valueOf() : new Date().valueOf();
        const localTime = date - new Date().getTimezoneOffset() * 60_000;
        this.dateElement.valueAsNumber = localTime;
        this.dateElement.tabIndex = -1;
        this.dateElement.focus();
        this.dateElement.showPicker();
        this.dateElement.addEventListener('input', () => {
          if (isNaN(this.dateElement!.valueAsNumber)) {
            this.dateChange.emit(null)
          } else {
            this.dateChange.emit(new Date(this.dateElement!.valueAsNumber + new Date().getTimezoneOffset() * 60_000))
          }
        })
        this.dateElement.addEventListener('blur', () => {
          this.dateElement?.remove()
        })
      }
    }
  }

}

export const CALENDAR_OVERLAY_COMPONENT = new InjectionToken<() => Type<unknown>>('calendar overlay')
export type CalendarOverlayData = {
  date: Date | null | undefined;
  dateOnly: boolean;
  onDateChange: (date: Date | null) => void;
}