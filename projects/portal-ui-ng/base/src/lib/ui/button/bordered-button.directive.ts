import { Directive, HostBinding, Input } from '@angular/core';
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
  },
})
export class BorderedButtonDirective {
  @HostBinding('attr.data-color') @Input() color:
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
    | 'rose' = 'default';

}
