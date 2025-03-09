import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, Directive, ElementRef, Injector, TemplateRef, booleanAttribute, computed, contentChild, forwardRef, inject, input, linkedSignal, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HoverableDirective, PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';
import { DropdownOverlayData } from './dropdown-overlay/dropdown-overlay.component';

@Directive({
  selector: '[puiDropdownTrigger]'
})
export class DropdownTriggerDirective {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[puiDropdownOverlay]'
})
export class DropdownOverlayDirective {
  templateRef = inject(TemplateRef);
}

@Component({
  selector: 'pui-dropdown',
  templateUrl: './dropdown.component.html',
  imports: [
    HoverableDirective,
    NgTemplateOutlet,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    }
  ]
})
export class DropdownComponent<T> implements ControlValueAccessor {
  protected trigger = contentChild(DropdownTriggerDirective);
  private dropdownOverlay = contentChild(DropdownOverlayDirective);
  private injector = inject(Injector);

  value = input<T | null>(null);
  internalValue$$ = linkedSignal(() => this.value())
  valueChange = output<T | null>();
  disabled = input(false, { transform: booleanAttribute });
  private _disabled$$ = signal<boolean>(false);
  disabled$$ = computed(() => this._disabled$$() || this.disabled())

  onChange?: (val: T | null) => void;
  onTouched?: () => void;

  writeValue(obj: T | null): void {
    this.internalValue$$.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled$$.set(isDisabled);
  }

  private destroyRef = inject(DestroyRef);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private overlay = inject(PuiOverlayService);
  private overlayRef?: PuiOverlayRef;
  openOverlay(event: MouseEvent) {
    if (this.overlayRef) {
      this.overlayRef.close();
      return;
    }
    const templateRef = this.dropdownOverlay()?.templateRef;
    if (!templateRef) return;
    this.overlayRef = this.overlay.open(
      templateRef,
      {
        data: {
          selectedValue: this.internalValue$$,
        } satisfies DropdownOverlayData<T>,
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions([
            { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom', offsetY: 8 },
            { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top', offsetY: -8 },
          ])
          .withPush(false)
          .withViewportMargin(8),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        minWidth: this.elementRef.nativeElement.getBoundingClientRect().width,
        maxWidth: '90svw',
        stayOpenedOnOutsideClicksContainedIn: [event.currentTarget as Element],
      }
    )
    this.overlayRef.afterClosed$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.overlayRef = undefined;
    })
  }

  selectValue(value: T | null) {
    this.internalValue$$.set(value);
    this.onChange?.(this.internalValue$$());
    this.valueChange.emit(value);
  }
}
