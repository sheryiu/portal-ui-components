import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ContentChild, ContentChildren, DestroyRef, ElementRef, HostBinding, HostListener, Injector, Input, QueryList, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, first, skipUntil, startWith, takeUntil, timer } from 'rxjs';
import { DropdownOptionDirective } from '../dropdown-panel/dropdown-option.directive';
import { DROPDOWN_PANEL_DATA, DropdownPanelComponent, DropdownPanelData } from '../dropdown-panel/dropdown-panel.component';
import { DropdownLabelDirective } from './dropdown-label.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      @if (label && label.templateRef) {
        <ng-container [ngTemplateOutlet]="label.templateRef" [ngTemplateOutletContext]="labelContext"></ng-container>
      }
      <i class="font-symbols icon-4 text-accent-200">expand_more</i>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    }
  ],
  host: {
    class: 'ds-dropdown',
  }
})
export class DropdownComponent<T> implements ControlValueAccessor {
  static id = 0;
  @Input() name: string = `appDropdown${ DropdownComponent.id++ }`;
  @HostBinding('tabIndex') private hostTabIndex = '0';
  @ContentChildren(DropdownOptionDirective) private options!: QueryList<DropdownOptionDirective>;
  @ContentChild(DropdownLabelDirective) label?: DropdownLabelDirective;
  labelContext: Record<string, any> = {};

  private overlayRef?: OverlayRef;
  private refDestroyed$?: Subject<void>;
  private _elementRef = inject(ElementRef) as ElementRef<Element>;
  private _overlayManager = inject(Overlay);
  private _injector = inject(Injector);

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.formGroup.valueChanges.pipe(
      startWith(this.formGroup.value),
      takeUntilDestroyed(),
    ).subscribe(value => {
      this.labelContext['$implicit'] = value[this.name]
    })
  }

  formGroup = new FormGroup({
    [this.name]: new FormControl<T | undefined>({
      value: undefined,
      disabled: false,
    })
  })
  onChange?: (val: T | undefined | null) => void;
  onTouched?: () => void;

  writeValue(obj: any): void {
    this.formGroup.setValue({ [this.name]: obj });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  @HostListener('focus')
  private openOverlay() {
    this.overlayRef = this._overlayManager.create({
      positionStrategy: this._overlayManager.position().flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([
          { originX: 'start', overlayX: 'start', originY: 'center', overlayY: 'center' },
        ]),
      scrollStrategy: this._overlayManager.scrollStrategies.reposition(),
      disposeOnNavigation: true,
      width: this._elementRef.nativeElement.getBoundingClientRect().width,
      hasBackdrop: false,
    });
    const portal = new ComponentPortal(DropdownPanelComponent, undefined, Injector.create({
      parent: this._injector,
      providers: [{
        provide: DROPDOWN_PANEL_DATA,
        useValue: {
          options: this.options,
          formGroup: this.formGroup,
          formControlName: this.name,
          onChange: () => {
            this.handleInput();
          }
        } as DropdownPanelData,
      }]
    }));
    this.overlayRef.attach(portal);
    this.refDestroyed$ = new Subject<void>();
    this.overlayRef.outsidePointerEvents().pipe(
      skipUntil(timer(300)),
      takeUntil(this.refDestroyed$),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.closeOverlay();
    });
  }

  @HostListener('blur', ['$event'])
  private closeOverlay(event?: MouseEvent) {
    if ((event?.relatedTarget as HTMLElement)?.closest('.cdk-overlay-container') != null) {
      this.formGroup.valueChanges.pipe(
        first(),
      ).subscribe(() => {
        this.overlayRef?.detach();
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        this.refDestroyed$?.next();
        this.refDestroyed$?.complete();
        this.refDestroyed$ = undefined;
      })
    } else {
      this.overlayRef?.detach();
      this.overlayRef?.dispose();
      this.overlayRef = undefined;
      this.refDestroyed$?.next();
      this.refDestroyed$?.complete();
      this.refDestroyed$ = undefined;
    }
  }

  private handleInput() {
    this.onTouched?.();
    this.onChange?.(this.formGroup.get(this.name)?.value);
    this.closeOverlay();
  }

}
