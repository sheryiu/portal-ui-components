import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
  selector: '[puiHoverable]',
  standalone: true,
  host: {
    class: 'pui-hoverable',
    '[attr.data-hoverable-enabled]': 'hoverableEnabled()',
  },
})
export class HoverableDirective {
  readonly hoverableEnabled = input(undefined, { transform: booleanAttribute });
}
