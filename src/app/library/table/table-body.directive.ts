import { Directive, inject } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
  selector: 'core-table-body',
  standalone: true,
  host: {
    class: 'core-table-body'
  }
})
export class TableBodyDirective {
  private table = inject(TableComponent);
}
