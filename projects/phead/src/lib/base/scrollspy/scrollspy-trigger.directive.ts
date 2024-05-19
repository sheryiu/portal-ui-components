import { DestroyRef, Directive, ElementRef, Injector, OnInit, afterNextRender, effect, inject, input } from '@angular/core';
import { ScrollspyService } from './scrollspy.service';

@Directive({
  selector: '[pheadScrollspyTrigger]',
})
export class ScrollspyTriggerDirective implements OnInit {
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private service = inject(ScrollspyService, { optional: true }) as ScrollspyService;
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private intersectionObserver?: IntersectionObserver;

  private scrollspyFn?: (value: number, top: number) => void;

  scrollspyId = input.required<string>();
  observeRootMargin = input<string>('0px 0px');
  observeNextSibling = input<boolean>(false);

  constructor() {
    if (!this.service) throw new Error('Use Scrollspy Trigger within a ScrollspyContainer');
    if (!(this.elementRef.nativeElement instanceof HTMLElement)) throw new Error('Use Scrollspy Trigger on a HTML element');
  }

  ngOnInit(): void {
    afterNextRender(() => {
      this.scrollspyFn = this.service.registerTrigger(this.scrollspyId(), this.elementRef.nativeElement);
      this.intersectionObserver = new IntersectionObserver(entries => {
        this.scrollspyFn?.(entries[0].intersectionRatio, this.elementRef.nativeElement.offsetTop);
      }, {
        threshold: Array(20).fill(0).map((_, i) => 0.05 * i),
        rootMargin: this.observeRootMargin(),
        root: this.service.containerElement ?? document.documentElement,
      })
      effect(() => {
        this.intersectionObserver?.disconnect();
        if (this.elementRef.nativeElement.nextElementSibling && this.observeNextSibling()) {
          this.intersectionObserver?.observe(this.elementRef.nativeElement.nextElementSibling!);
        } else {
          this.intersectionObserver?.observe(this.elementRef.nativeElement);
        }
      }, { injector: this.injector })
    }, { injector: this.injector })
    this.destroyRef.onDestroy(() => {
      this.intersectionObserver?.disconnect();
    })
  }

}
