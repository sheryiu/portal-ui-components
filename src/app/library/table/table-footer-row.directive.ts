import { Directive, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableComponent } from './table.component';

@Directive({
  selector: 'core-table-footer-row',
  standalone: true,
  host: {
    class: 'core-table-footer-row'
  }
})
export class TableFooterRowDirective {
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);

  constructor() {
    this.table.columns$.pipe(
      takeUntilDestroyed(),
    ).subscribe(columns => {
      this.hostColumnEnd = `span ${ columns.length }`
    })
  }

}
