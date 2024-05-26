import { Directive, inject } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
  selector: 'pui-table-body',
  standalone: true,
  host: {
    class: 'pui-table-body'
  }
})
export class TableBodyDirective {
  private table = inject(TableComponent);
}
