import { Directive, HostBinding, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[pheadHoverable]',
  standalone: true,
  host: {
    class: 'phead-hoverable'
  }
})
export class HoverableDirective {
  @HostBinding('attr.data-enabled') @Input({ transform: booleanAttribute }) hoverableEnabled = true;

}
