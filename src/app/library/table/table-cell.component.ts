import { Component } from '@angular/core';

@Component({
  selector: 'core-table-cell',
  standalone: true,
  host: {
    class: 'core-table-cell',
    role: 'cell',
  },
  template: `<ng-content></ng-content>`
})
export class TableCellComponent {
}