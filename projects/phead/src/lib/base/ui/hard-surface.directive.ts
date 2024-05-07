import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[pheadHardSurface]',
  standalone: true,
  host: {
    class: 'phead-hard-surface',
  }
})
export class HardSurfaceDirective {
  @HostBinding('attr.data-color') @Input() color: 'default' | 'primary' | 'accent' | 'gray' | 'grey' | 'red' | 'transparent' = 'default'
}
