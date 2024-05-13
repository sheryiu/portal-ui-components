import { Component, ContentChild, DestroyRef, Directive, ElementRef, TemplateRef, forwardRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PheadOverlayRef, PheadOverlayService } from '../../../base';

@Directive({
  selector: '[pheadDropdownTrigger]',
})
export class DropdownTriggerDirective {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[pheadDropdownOverlay]',
})
export class DropdownOverlayDirective {
  templateRef = inject(TemplateRef);
}

@Component({
  selector: 'phead-dropdown',
  templateUrl: './dropdown.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    }
  ]
})
export class DropdownComponent<T> implements ControlValueAccessor {
  @ContentChild(DropdownTriggerDirective) trigger?: DropdownTriggerDirective;
  @ContentChild(DropdownOverlayDirective) private dropdownOverlay?: DropdownOverlayDirective;

  value$$ = signal<T | null>(null);
  disabled$$ = signal<boolean>(false);

  onChange?: (val: T) => void;
  onTouched?: () => void;

  writeValue(obj: T): void {
    this.value$$.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled$$.set(isDisabled);
  }

  private destroyRef = inject(DestroyRef);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private overlay = inject(PheadOverlayService);
  private overlayRef?: PheadOverlayRef;
  openOverlay(event: MouseEvent) {
    if (this.overlayRef) {
      this.overlayRef.close();
      return;
    }
    if (!this.dropdownOverlay?.templateRef) return;
    this.overlayRef = this.overlay.open(
      this.dropdownOverlay.templateRef,
      {
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions([
            { overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom', offsetY: 8 },
            { overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top', offsetY: -8 },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        width: this.elementRef.nativeElement.getBoundingClientRect().width,
        ignorePointerEventsFrom: [event.currentTarget as Element],
      }
    )
    this.overlayRef.afterClosed$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.overlayRef = undefined;
    })
  }
}
