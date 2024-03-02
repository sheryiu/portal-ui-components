import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabBarService } from './tab-bar.service';

@Directive({
  selector: '[coreTabBarContainerElement]',
  standalone: true,
  providers: [
    TabBarService,
  ]
})
export class TabBarContainerElementDirective {
  private service = inject(TabBarService, { host: true });
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.elementRef.nativeElement.addEventListener('scroll', e => {
        this.zone.run(() => {
          this.service.scroll$.next(this.elementRef.nativeElement.scrollTop);
        })
      })
      this.service.scrollTo.pipe(
        takeUntilDestroyed(),
      ).subscribe(elementRef => {
        this.elementRef.nativeElement.scrollTo({
          top: elementRef.nativeElement.getBoundingClientRect().top + this.elementRef.nativeElement.scrollTop - this.elementRef.nativeElement.getBoundingClientRect().height * 0.25,
          behavior: 'smooth'
        })
      })
    }
  }
}
