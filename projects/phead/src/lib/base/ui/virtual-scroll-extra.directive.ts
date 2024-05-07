import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'cdk-virtual-scroll-viewport',
  standalone: true,
  host: {
    class: 'phead-virtual-scroll-extra'
  }
})
export class VirtualScrollExtraDirective {
  @Input() @HostBinding('style.--virtual-scroll-extra-height.px') extraHeight = 0;

}
