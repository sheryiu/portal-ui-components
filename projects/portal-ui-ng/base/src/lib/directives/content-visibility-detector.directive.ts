import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, Directive, ElementRef, inject, output, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[puiContentVisibilityDetector]',
  host: {
    class: 'pui-content-visibility-detector'
  }
})
export class ContentVisibilityDetectorDirective {
  private elementRef = inject(ElementRef) as ElementRef<HTMLDivElement>
  private destroyRef = inject(DestroyRef)

  skippedChanged = output<boolean>()

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const callback = (event: Event) => {
        if (event instanceof ContentVisibilityAutoStateChangeEvent) {
          this.skippedChanged.emit(event.skipped)
        }
      }
      this.elementRef.nativeElement.addEventListener('contentvisibilityautostatechange', callback)
      this.destroyRef.onDestroy(() => {
        this.elementRef.nativeElement.removeEventListener('contentvisibilityautostatechange', callback)
      })
    }
  }

}
