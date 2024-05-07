import { Directive, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableComponent } from './table.component';

@Directive({
  selector: 'phead-table-footer-row',
  standalone: true,
  host: {
    class: 'phead-table-footer-row'
  }
})
export class TableFooterRowDirective {
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);

  constructor() {
    this.checkColumns();
    this.table.responsiveUpdated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.checkColumns();
    })
  }

  checkColumns() {
    this.hostColumnEnd = `span ${ this.table.activeColumns?.length }`
  }

}
