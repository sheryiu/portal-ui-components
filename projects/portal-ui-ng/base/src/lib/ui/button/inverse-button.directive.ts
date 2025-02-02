import { Directive, input } from '@angular/core';

@Directive({
  selector: '[puiInverseButton]',
  standalone: true,
  host: {
    class: 'pui-inverse-button',
    '[attr.data-color]': 'color()',
  },
})
export class InverseButtonDirective {
  readonly color = input<
    | 'default'
    | 'primary'
    | 'accent'
    | 'gray'
    | 'grey'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
  >('default');
}
