import { Component, ContentChild, Directive, Input, TemplateRef, ViewChild, booleanAttribute, inject } from '@angular/core';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../components/overlay/overlay.service';
import { SharedModule } from '../../shared/shared.module';

@Directive({
  selector: '[coreTableHeaderCellSort]',
  standalone: true,
})
export class TableHeaderCellSortDirective {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[coreTableHeaderCellFilter]',
  standalone: true,
})
export class TableHeaderCellFilterDirective {
  templateRef = inject(TemplateRef);
}

@Component({
  selector: 'core-table-header-cell',
  standalone: true,
  imports: [SharedModule],
  host: {
    class: 'core-table-header-cell',
    role: 'cell',
  },
  templateUrl: './table-header-cell.component.html',
})
export class TableHeaderCellComponent {
  @Input({ transform: booleanAttribute }) justifyEnd: boolean = false;
  @Input({ transform: booleanAttribute }) filtered: boolean = false;
  @Input({ transform: booleanAttribute }) sortedAsc: boolean = false;
  @Input({ transform: booleanAttribute }) sortedDesc: boolean = false;
  @ViewChild('filterPopup') private filterPopup!: TemplateRef<unknown>;
  @ContentChild(TableHeaderCellSortDirective) sortDirective?: TableHeaderCellSortDirective;
  @ContentChild(TableHeaderCellFilterDirective) filterDirective?: TableHeaderCellFilterDirective;
  private overlay = inject(OverlayService);
  overlayRef?: OverlayRefExtra;

  openFilter(button: HTMLButtonElement) {
    if (this.overlayRef) return;
    if (!this.filterDirective?.templateRef && !this.sortDirective?.templateRef) return;
    this.overlayRef = this.overlay.open(
      this.filterPopup,
      {
        positionStrategy: this.overlay.position().flexibleConnectedTo(button)
          .withPositions([
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 }
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        width: button.getBoundingClientRect().width,
      }
    )
    this.overlayRef.afterClosed$.subscribe(() => this.overlayRef = undefined);
  }
}