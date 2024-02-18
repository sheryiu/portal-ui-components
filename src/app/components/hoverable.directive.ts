import { Directive, HostBinding, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[coreHoverable]',
  standalone: true,
  host: {
    class: 'core-hoverable'
  }
})
export class HoverableDirective {
  @HostBinding('[attr.data-enabled]') @Input({ transform: booleanAttribute }) hoverableEnabled = true;

}
