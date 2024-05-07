import { NgClass, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { Component, ContentChild, Directive, ElementRef, Input, PLATFORM_ID, Renderer2, TemplateRef, ViewChild, booleanAttribute, inject } from '@angular/core';

import { HoverableDirective, PheadOverlayRef, PheadOverlayService } from '../../../base';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';

@Directive({
  selector: '[pheadTableHeaderCellSort]',
  standalone: true,
})
export class TableHeaderCellSortDirective {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[pheadTableHeaderCellFilter]',
  standalone: true,
})
export class TableHeaderCellFilterDirective {
  templateRef = inject(TemplateRef);
}

@Component({
  selector: 'phead-table-header-cell',
  standalone: true,
  imports: [HoverableDirective, NgClass, NgTemplateOutlet],
  host: {
    class: 'phead-table-header-cell',
    role: 'cell',
  },
  templateUrl: './table-header-cell.component.html',
})
export class TableHeaderCellComponent {
  @Input({ transform: booleanAttribute }) rightAligned: boolean = false;
  @Input({ transform: booleanAttribute }) filtered: boolean = false;
  @Input({ transform: booleanAttribute }) sortedAsc: boolean = false;
  @Input({ transform: booleanAttribute }) sortedDesc: boolean = false;
  @ViewChild('filterPopup') private filterPopup!: TemplateRef<unknown>;
  @ContentChild(TableHeaderCellSortDirective) sortDirective?: TableHeaderCellSortDirective;
  @ContentChild(TableHeaderCellFilterDirective) filterDirective?: TableHeaderCellFilterDirective;
  private overlay = inject(PheadOverlayService);
  overlayRef?: PheadOverlayRef;

  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableHeaderCellDefDirective);

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      this.renderer.addClass(elRef.nativeElement, `phead-table-column-${ this.tableCellDef.columnName }`)
    }
  }

  openFilter(button: HTMLButtonElement) {
    if (this.overlayRef) {
      this.overlayRef.close();
      return;
    }
    if (!this.filterDirective?.templateRef && !this.sortDirective?.templateRef) return;
    this.overlayRef = this.overlay.open(
      this.filterPopup,
      {
        positionStrategy: this.overlay.position().flexibleConnectedTo(button)
          .withPositions([
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 }
          ])
          .withViewportMargin(16),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        width: button.getBoundingClientRect().width,
        ignorePointerEventsFrom: button,
      }
    )
    this.overlayRef.afterClosed$.subscribe(() => this.overlayRef = undefined);
  }
}