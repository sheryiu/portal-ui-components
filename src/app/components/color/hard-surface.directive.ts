import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[coreHardSurface]',
  standalone: true,
  host: {
    class: 'core-hard-surface',
  }
})
export class HardSurfaceDirective {
  @HostBinding('attr.data-color') @Input() color: 'default' | 'primary' | 'accent' | 'gray' | 'grey' = 'default'
}
