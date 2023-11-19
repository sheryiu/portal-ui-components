import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostBinding, HostListener, PLATFORM_ID, Renderer2, inject } from '@angular/core';

@Directive({
  selector: 'a[appBaseButton], button[appBaseButton]',
  standalone: true
})
export class BaseButtonDirective {

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;

  private highlightEl;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ds-base-button');
      this.highlightEl = this.renderer.createElement('div');
      this.renderer.addClass(this.highlightEl, 'ds-base-button-highlight');
      this.renderer.insertBefore(this.elementRef.nativeElement, this.highlightEl, null);
    }
  }

}
