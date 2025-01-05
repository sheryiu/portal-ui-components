import { Directive, HostBinding, Input } from '@angular/core';
import { HoverableDirective } from '../hoverable.directive';

@Directive({
  selector: '[puiFilledButton]',
  standalone: true,
  hostDirectives: [
    {
      directive: HoverableDirective,
      inputs: ['hoverableEnabled'],
    },
  ],
  host: {
    class: 'pui-filled-button',
  },
})
export class FilledButtonDirective {
  @HostBinding('attr.data-color') @Input() color:
    | 'primary'
    | 'accent'
    | 'light'
    | 'dark'
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
    | 'rose' = 'primary';
}
