import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Directive, ElementRef, HostBinding, Input, NgZone, inject, numberAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @param checkFor Defaults to -8 (in px)
 * Calculated from -(height of header - 96 + 8)
 * @description Adds data-stuck=true attribute when element's y position equals to checkFor value
 */
@Directive({
  selector: '[coreStickyHeader]',
  standalone: true,
  host: {
    class: 'core-sticky-header'
  }
})
export class StickyHeaderDirective {
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private scrollDispatcher = inject(ScrollDispatcher);
  private zone = inject(NgZone);
  @HostBinding('attr.data-stuck') private hostDataStuck = false;
  @Input({ transform: numberAttribute }) private checkFor = -8;

  constructor() {
    this.scrollDispatcher.scrolled().pipe(
      takeUntilDestroyed(),
    ).subscribe((scrollable) => {
      if (scrollable && scrollable.getElementRef().nativeElement.contains(this.elementRef.nativeElement)) {
        this.zone.run(() => {
          this.hostDataStuck = (this.elementRef.nativeElement.getBoundingClientRect().y === this.checkFor)
        })
      }
    })
  }
}
