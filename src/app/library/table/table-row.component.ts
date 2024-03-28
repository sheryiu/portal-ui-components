import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, HostBinding, Input, QueryList, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TableCellDefDirective } from './table-cell-def.directive';
import { TableComponent } from './table.component';

@Component({
  selector: 'core-table-row',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  host: {
    class: 'core-table-row',
    role: 'row',
  },
  template: `
  <a
    [routerLink]="route"
    routerLinkActive
    #active="routerLinkActive"
    [attr.data-active]="active.isActive"
    [style.height.px]="height"
  >
    @for (def of cells; track def.columnName) {
      <ng-container [ngTemplateOutlet]="def.templateRef"></ng-container>
    }
  </a>
  `
})
export class TableRowComponent implements AfterContentInit {
  @Input() route?: any[];
  @Input() relativeTo?: ActivatedRoute | null;
  @ContentChildren(TableCellDefDirective) private cellDefs!: QueryList<TableCellDefDirective>;
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);

  height?: number;
  cells?: { columnName: string; templateRef: TemplateRef<unknown> }[];

  constructor() {
    this.table.responsiveUpdated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.checkColumns();
    })
  }

  ngAfterContentInit(): void {
    this.checkColumns();
  }

  checkColumns() {
    this.height = this.table.activeItemHeight;
    this.cells = this.table.activeColumns
      ?.map(columnName => this.cellDefs.find(def => def.columnName === columnName))
      .filter((def): def is TableCellDefDirective => def != null)
      .map(def => ({
        columnName: def.columnName,
        templateRef: def.templateRef,
      }))
    this.hostColumnEnd = `span ${ this.cells?.length }`
  }

}
