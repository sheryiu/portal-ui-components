import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pui-table-simple-footer',
  imports: [],
  template: `{{ dataCount() }} Loaded`
})
export class TableSimpleFooterComponent {
  private viewport = inject(CdkVirtualScrollViewport, { optional: true });

  readonly dataCountInput = input<number | null | undefined>(0, { alias: 'dataCount' });
  protected dataCount = linkedSignal(() => this.dataCountInput() ?? 0)

  constructor() {
    this.viewport?.renderedRangeStream.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.dataCount.set(this.viewport?.getDataLength() ?? 0)
    })
  }
}
