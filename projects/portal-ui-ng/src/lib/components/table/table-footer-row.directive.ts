import { Directive, effect, HostBinding, inject } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
  selector: 'pui-table-footer-row',
  standalone: true,
  host: {
    class: 'pui-table-footer-row'
  }
})
export class TableFooterRowDirective {
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);

  constructor() {
    effect(() => {
      const cells = this.table.activeColumns();
      if (cells) {
        this.hostColumnEnd = `span ${ cells?.length }`
      }
    })
  }

}
