import { Component, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { nanoid } from 'nanoid';
import { tap } from 'rxjs';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../components/overlay/overlay.service';
import { SharedModule } from '../../shared/shared.module';
import { SearchInputLabelDirective } from './search-input-label.directive';

@Component({
  selector: 'core-search-input',
  standalone: true,
  imports: [
    SharedModule,
  ],
  host: {
    class: 'core-search-input',
    tabIndex: '0',
  },
  templateUrl: './search-input.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    }
  ]
})
export class SearchInputComponent extends EffectFn implements ControlValueAccessor {
  onChange?: (v: string | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  formControl = inject(FormBuilder).nonNullable.control(null as string | null | undefined);

  @Input() name: string = nanoid();
  @Input() set value(v: string | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<string | null | undefined>();
  @HostBinding('attr.data-popupvisible') hostPopupvisible = false;
  @ViewChild(SearchInputLabelDirective) label?: SearchInputLabelDirective;
  @ViewChild('searchPopup') private searchPopup!: TemplateRef<unknown>;

  private overlay = inject(OverlayService);
  overlayRef?: OverlayRefExtra;

  @HostListener('click', ['$event'])
  private hostClick = this.createEffectFn<MouseEvent>(args$ => args$.pipe(
    tap((event) => {
      if (this.overlayRef) return;
      if (!(event.currentTarget instanceof HTMLElement)) return;
      this.hostPopupvisible = true;
      this.overlayRef = this.overlay.open(this.searchPopup, {
        positionStrategy: this.overlay.position().flexibleConnectedTo(event.currentTarget)
          .withPositions([
            { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'bottom', offsetY: 4 },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        width: event.currentTarget.getBoundingClientRect().width,
      })
      this.overlayRef.afterClosed$.subscribe(() => {
        this.overlayRef = undefined;
        this.hostPopupvisible = false;
      });
    })
  ))

  writeValue(obj: string | null | undefined): void {
    this.formControl.reset(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
    this.isDisabled = isDisabled;
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.formControl.getRawValue());
    this.valueChange.emit(this.formControl.getRawValue());
  }

}
