import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PheadOverlayRef, PheadOverlayService } from '../../base';
import { AutocompleteOverlayComponent, AutocompleteOverlayData } from './autocomplete-overlay/autocomplete-overlay.component';

@Directive({
  selector: 'input[pheadAutocompleteTrigger]',
  standalone: true
})
export class AutocompleteTriggerDirective<D> implements OnChanges {
  @Input({ alias: 'autocompleteEnabled' }) enabled: boolean = false;
  @Input({ alias: 'autocompleteValues' }) values?: D[];
  @Input({ alias: 'autocompleteTemplateRef'}) templateRef?: TemplateRef<unknown>;
  @Output() autocompleteChange = new EventEmitter<D>();
  @HostBinding('attr.autocomplete') private hostAutocomplete?: string;

  private overlay = inject(PheadOverlayService);
  private focusMonitor = inject(FocusMonitor);
  private elementRef = inject(ElementRef) as ElementRef<HTMLInputElement>;

  private overlayRef?: PheadOverlayRef;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.hostAutocomplete = this.enabled ? 'off' : undefined;
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
        ignorePointerEventsFrom: this.elementRef.nativeElement,
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
