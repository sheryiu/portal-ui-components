import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[puiInverseButton]',
  standalone: true,
  host: {
    class: 'pui-inverse-button',
  },
})
export class InverseButtonDirective {
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
