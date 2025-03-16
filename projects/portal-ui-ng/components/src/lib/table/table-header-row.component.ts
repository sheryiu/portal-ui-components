import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
  selector: 'pui-table-header-row',
  imports: [NgTemplateOutlet],
  host: {
    class: 'pui-table-header-row',
    role: 'rowheader',
    '[attr.data-resizable]': 'resizable()'
  },
  template: `
  <ng-content />
  @for (def of cells(); track def.columnName) {
    @if (def.templateRef == null) {
      <div
        class="pui-table-header-cell--empty"
        [style.anchor-name]="'--' + def.columnName"
      ></div>
    } @else {
      <ng-container [ngTemplateOutlet]="def.templateRef"></ng-container>
    }
    @if (resizable()) {
      @if (!$last) {
        <button
          class="pui-table-header-row__resize-handle"
          [style.position-anchor]="'--' + def.columnName"
          tabindex="-1"
          type="button"
          (pointerdown)="onResizeHandleDown($event, def.columnName)"
          (pointerup)="onResizeHandleUp($event, def.columnName, $index)"
          (pointerleave)="onResizeHandleLeave($event, def.columnName)"
          (pointermove)="onResizeHandleMove($event, def.columnName)"
          [style.translate]="selectedResizeHandle() == def.columnName ? resizeHandleTranslate() : undefined"
        ></button>
      }
    }
  }
  `
})
export class TableHeaderRowComponent {
  private table = inject(TableComponent);

  cells = computed(() => {
    const columns = this.table.activeColumns();
    if (columns == null) return undefined;
    const cellDefs = this.table.headerCellDefs();
    return columns
      .map(columnName => cellDefs.find(def => def.columnName() == columnName))
      .map((def, i) => def ? ({
        columnName: def.columnName(),
        templateRef: def.templateRef,
      }) : ({
        columnName: `__empty_${ i }`,
        templateRef: null,
      }))
  })
  resizable = computed(() => this.table.resizable() ? true : undefined)

  private resizeHandleDX = signal(0)
  protected selectedResizeHandle = signal<string | undefined>(undefined)
  protected resizeHandleTranslate = computed(() => `${ this.resizeHandleDX() }px 0px`)

  onResizeHandleDown(event: PointerEvent, columnName: string) {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    this.resizeHandleDX.set(0)
    this.selectedResizeHandle.set(columnName)
  }
  onResizeHandleUp(event: PointerEvent, columnName: string, index: number) {
    const previous = (event.currentTarget as HTMLElement).previousElementSibling
    if (previous) {
      const newSize = previous.getBoundingClientRect().width + this.resizeHandleDX()
      this.table.columnResized(newSize, columnName, index);
    }
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
  }
  onResizeHandleLeave(event: PointerEvent, columnName: string) {
    this.selectedResizeHandle.set(undefined)
    this.resizeHandleDX.set(0)
  }
  onResizeHandleMove(event: PointerEvent, columnName: string) {
    if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
      this.resizeHandleDX.update(dx => dx + event.movementX)
    }
  }
}
