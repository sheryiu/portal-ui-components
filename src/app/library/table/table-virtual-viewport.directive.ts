import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableComponent } from './table.component';

@Directive({
  selector: 'cdk-virtual-scroll-viewport',
  standalone: true
})
export class TableVirtualViewportDirective {
  private table = inject(TableComponent, { optional: true });
  private cdkViewport = inject(VIRTUAL_SCROLL_STRATEGY, { optional: true });

  constructor() {
    if (this.cdkViewport instanceof FixedSizeVirtualScrollStrategy) {
      (this.table?.activeItemHeight != null) && (this.cdkViewport as FixedSizeVirtualScrollStrategy)!.updateItemAndBufferSize(this.table?.activeItemHeight, 200, 200);
      this.table?.responsiveUpdated$.pipe(
        takeUntilDestroyed(),
      ).subscribe(() => {
        (this.table?.activeItemHeight != null) && (this.cdkViewport as FixedSizeVirtualScrollStrategy)!.updateItemAndBufferSize(this.table?.activeItemHeight, 200, 200);
      })
    }
  }

}
