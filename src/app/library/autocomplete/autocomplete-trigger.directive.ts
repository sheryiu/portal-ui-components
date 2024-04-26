import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../components/overlay/overlay.service';
import { AutocompleteOverlayComponent, AutocompleteOverlayData } from './autocomplete-overlay/autocomplete-overlay.component';

@Directive({
  selector: 'input[coreAutocompleteTrigger]',
  standalone: true
})
export class AutocompleteTriggerDirective<D> {
  @Input({ alias: 'autocompleteEnabled' }) enabled: boolean = false;
  @Input({ alias: 'autocompleteValues' }) values?: D[];
  @Input({ alias: 'autocompleteTemplateRef'}) templateRef?: TemplateRef<unknown>;
  @Output() autocompleteChange = new EventEmitter<D>();

  private overlay = inject(OverlayService);
  private focusMonitor = inject(FocusMonitor);
  private elementRef = inject(ElementRef) as ElementRef<HTMLInputElement>;

  private overlayRef?: OverlayRefExtra;

  constructor() {
    if (this.elementRef.nativeElement) {
      this.focusMonitor.monitor(this.elementRef.nativeElement).pipe(
        takeUntilDestroyed(),
      ).subscribe(focus => {
        if (focus) {
          this.openOverlay();
        }
      })
    }
  }

  openOverlay() {
    if (this.overlayRef) return;
    if (!this.values) return;
    if (!this.enabled) return;
    if (!this.templateRef) return;
    this.overlayRef = this.overlay.open<AutocompleteOverlayComponent<D>, AutocompleteOverlayData<D>>(
      AutocompleteOverlayComponent,
      {
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions([
            { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom', offsetY: 8 },
            { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top', offsetY: -8 },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        width: this.elementRef.nativeElement.getBoundingClientRect().width,
        data: {
          templateRef: this.templateRef,
          data: this.values,
          onSelect: (value) => {
            // TODO change the value
            this.elementRef.nativeElement.value = String(value);
            this.autocompleteChange.emit(value);
            this.closeOverlay();
          }
        },
      }
    )
    this.overlayRef.afterClosed$.subscribe(() => {
      this.overlayRef = undefined;
    })
  }

  closeOverlay() {
    this.overlayRef?.close();
  }

}
