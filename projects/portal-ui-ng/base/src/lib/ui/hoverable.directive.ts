import { Directive, ElementRef, Renderer2, booleanAttribute, effect, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[puiHoverable]',
  standalone: true,
  host: {
    class: 'pui-hoverable',
    '[attr.data-enabled]': 'isEnabled()',
  },
})
export class HoverableDirective {
  private elementRef = inject(ElementRef);
  private renderer2 = inject(Renderer2);

  readonly hoverableEnabled = input(undefined, { transform: booleanAttribute });
  readonly attrDisabled = input(undefined, { transform: booleanAttribute, alias: 'disabled' });

  /** @internal */
  isEnabled = signal(true);

  constructor() {
    effect(() => {
      if (this.attrDisabled() != null) {
        this.isEnabled.set(this.attrDisabled() === false);
      } else if (this.hoverableEnabled() != null) {
        this.isEnabled.set(this.hoverableEnabled() === true);
      }
    })
    effect(() => {
      const element = this.elementRef.nativeElement;
      if (element instanceof HTMLButtonElement) {
        this.renderer2.setProperty(element, 'disabled', !this.isEnabled());
      }
    })
  }
}
