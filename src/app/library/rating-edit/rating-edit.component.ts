import { Component, EventEmitter, Input, Output, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'core-rating-edit',
  standalone: true,
  imports: [
    SharedModule
  ],
  host: {
    class: 'core-rating-edit'
  },
  templateUrl: './rating-edit.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingEditComponent),
      multi: true,
    }
  ]
})
export class RatingEditComponent implements ControlValueAccessor {
  onChange?: (v: number | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  @Input({ required: true, transform: numberAttribute }) max!: number;
  @Input() set value(v: number | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<number | null | undefined>();

  arrayTemplate?: Array<number>;
  hoveringValue?: number;
  selectedValue?: number | null;

  writeValue(obj: number | null | undefined): void {
    this.selectedValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onStarHover(i: number) {
    if (this.isDisabled) return;
    this.hoveringValue = i;
  }

  onStarSelect(i: number) {
    if (this.isDisabled) return;
    this.hoveringValue = undefined;
    this.selectedValue = i;
    this.handleInput();
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.selectedValue);
    this.valueChange.emit(this.selectedValue);
  }

}
