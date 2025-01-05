import { Directive, HostBinding, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[puiHoverable]',
  standalone: true,
  host: {
    class: 'pui-hoverable'
  }
})
export class HoverableDirective {
  @HostBinding('attr.data-enabled')
  @Input({ transform: booleanAttribute })
  hoverableEnabled = true;

}
