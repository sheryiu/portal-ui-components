import { Directive, HostBinding, Input } from '@angular/core';
import { HoverableDirective } from '../hoverable.directive';

@Directive({
  selector: '[puiBaseButton]',
  standalone: true,
  hostDirectives: [
    {
      directive: HoverableDirective,
      inputs: ['hoverableEnabled'],
    },
  ],
  host: {
    class: 'pui-base-button',
  },
})
export class BaseButtonDirective {
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
