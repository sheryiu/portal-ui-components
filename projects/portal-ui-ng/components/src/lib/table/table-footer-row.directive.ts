import { Directive } from '@angular/core';

@Directive({
  selector: 'pui-table-footer-row',
  standalone: true,
  host: {
    class: 'pui-table-footer-row'
  }
})
export class TableFooterRowDirective {
}
