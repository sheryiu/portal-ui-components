import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
  selector: '[puiHoverable]',
  standalone: true,
  host: {
    class: 'pui-hoverable',
    '[attr.data-enabled]': 'hoverableEnabled()',
  },
})
export class HoverableDirective {
  readonly hoverableEnabled = input(true, { transform: booleanAttribute });
}
