import { Directive, inject } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
  selector: 'phead-table-body',
  standalone: true,
  host: {
    class: 'phead-table-body'
  }
})
export class TableBodyDirective {
  private table = inject(TableComponent);
}
