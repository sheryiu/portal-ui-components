import { Directive, input } from '@angular/core';
import { HoverableDirective } from '../hoverable.directive';

@Directive({
  selector: '[puiBorderedButton]',
  standalone: true,
  hostDirectives: [
    {
      directive: HoverableDirective,
      inputs: ['hoverableEnabled'],
    },
  ],
  host: {
    class: 'pui-bordered-button',
    '[attr.data-color]': 'color()',
  },
})
export class BorderedButtonDirective {
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
