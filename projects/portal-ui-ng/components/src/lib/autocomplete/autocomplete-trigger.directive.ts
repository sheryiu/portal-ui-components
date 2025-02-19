import { FocusMonitor } from '@angular/cdk/a11y';
import { DestroyRef, Directive, ElementRef, TemplateRef, booleanAttribute, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';
import { AutocompleteOverlayComponent, AutocompleteOverlayData } from './autocomplete-overlay/autocomplete-overlay.component';

export type AutocompleteTriggerOverlayConfig = {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
}

@Directive({
  selector: 'input[puiAutocompleteTrigger]',
  standalone: true,
  host: {
    '[attr.autocomplete]': 'hostAutocomplete',
    '(click)': 'hostClick()'
  }
})
export class AutocompleteTriggerDirective<D> {
  private overlay = inject(PuiOverlayService);
  private focusMonitor = inject(FocusMonitor);
  private elementRef = inject(ElementRef) as ElementRef<HTMLInputElement>;
  private destroyRef = inject(DestroyRef);

  enabled = input(true, { alias: 'autocompleteEnabled', transform: booleanAttribute })
  values = input.required<D[]>({ alias: 'autocompleteValues' })
  templateRef = input<TemplateRef<{ $implicit: D; value: string }> | undefined>(undefined, { alias: 'autocompleteTemplateRef' })
  overlayConfig = input<AutocompleteTriggerOverlayConfig>({}, { alias: 'autocompleteOverlayConfig' })
  valueFn = input<(v: D) => string>(String, { alias: 'autocompleteValueFn' })
  autocompleteChange = output<D>()

  private hostAutocomplete?: string;

  private overlayRef?: PuiOverlayRef;

  constructor() {
    if (this.elementRef.nativeElement instanceof HTMLInputElement) {
      this.focusMonitor.monitor(this.elementRef.nativeElement).pipe(
        takeUntilDestroyed(),
      ).subscribe(focus => {
        if (focus) {
          this.openOverlay();
        }
      })
      effect(() => {
        this.hostAutocomplete = this.enabled() ? 'off' : undefined;
      })
    }
    this.destroyRef.onDestroy(() => {
      this.closeOverlay()
    })
  }

  private hostClick() {
    this.openOverlay();
  }

  openOverlay() {
    if (this.overlayRef) return;
    const enabled = this.enabled();
    if (!enabled) return;
    const templateRef = this.templateRef();
    if (!templateRef) return;
    const values = this.values();
    if (!values) return;
    this.overlayRef = this.overlay.open<AutocompleteOverlayComponent<D>, AutocompleteOverlayData<D>>(
      AutocompleteOverlayComponent,
      {
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions([
            { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom', offsetY: 8 },
            { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top', offsetY: -8 },
          ])
          .withPush(false)
          .withViewportMargin(8),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        minWidth: this.overlayConfig()?.minWidth ?? '20svw',
        width: this.elementRef.nativeElement.getBoundingClientRect().width,
        maxWidth: this.overlayConfig()?.maxWidth ?? '90svw',
        minHeight: this.overlayConfig()?.minHeight ?? '4rem',
        maxHeight: this.overlayConfig()?.maxHeight ?? '40svh',
        data: {
          templateRef: templateRef,
          items: values,
          selectedValue: this.elementRef.nativeElement.value,
          valueFn: this.valueFn(),
          onSelect: (value) => {
            // TODO allow to set as different value
            this.elementRef.nativeElement.value = String(value);
            this.autocompleteChange.emit(value);
            this.closeOverlay();
          }
        },
        stayOpenedOnOutsideClicksContainedIn: this.elementRef.nativeElement,
        closeOnEscapeKeydown: true,
        closeOnBackdropClick: true,
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
