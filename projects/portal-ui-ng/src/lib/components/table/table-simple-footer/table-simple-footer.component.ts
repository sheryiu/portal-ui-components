import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pui-table-simple-footer',
  standalone: true,
  imports: [],
  template: `{{ dataCount }} Loaded`,
})
export class TableSimpleFooterComponent {
  private viewport = inject(CdkVirtualScrollViewport, { optional: true });

  @Input() dataCount: number | undefined = 0;

  constructor() {
    this.viewport?.renderedRangeStream.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.dataCount = this.viewport?.getDataLength()
    })
  }
}
