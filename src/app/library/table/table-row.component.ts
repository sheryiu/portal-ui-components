import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, HostBinding, Input, TemplateRef, inject } from '@angular/core';
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
    [relativeTo]="relativeTo"
    routerLinkActive
    #active="routerLinkActive"
    [attr.data-active]="active.isActive"
    [style.height.px]="height"
  >
    @for (def of cells; track def.columnName) {
      <ng-container [ngTemplateOutlet]="def.templateRef" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
    }
  </a>
  `
})
export class TableRowComponent<T> implements AfterContentInit {
  @Input({ required: true }) item!: T;
  @Input() route?: any[];
  @Input() relativeTo?: ActivatedRoute | null = inject(ActivatedRoute);
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
      ?.map(columnName => this.table.cellDefs?.find(def => def.columnName === columnName))
      .filter((def): def is TableCellDefDirective => def != null)
      .map(def => ({
        columnName: def.columnName,
        templateRef: def.templateRef,
      }))
    this.hostColumnEnd = `span ${ this.cells?.length }`
  }

}
