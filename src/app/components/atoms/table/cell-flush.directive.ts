import { Directive, HostBinding, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: 'cdkCell[flush], cdk-cell[flush]',
  standalone: true
})
export class CellFlushDirective {
  @Input({ transform: booleanAttribute })
  @HostBinding('class.ds-table-cell-flush')
  flush: boolean = true;

}
