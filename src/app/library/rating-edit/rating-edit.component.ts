import { Component, EventEmitter, HostListener, Input, Output, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'core-rating-edit',
  standalone: true,
  imports: [
    SharedModule
  ],
  host: {
    class: 'core-rating-edit',
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
  @Input({ required: true, transform: numberAttribute }) min!: number;
  @Input() set value(v: number | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<number | null | undefined>();
  @HostListener('pointerleave')
  private hostPointerleave() {
    this.hoveringPosition = undefined;
  }

  hoveringPosition?: number;
  selectedPosition?: number | null;

  writeValue(obj: number | null | undefined): void {
    this.selectedPosition = (obj != null) ? obj - this.min : obj;
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
    this.hoveringPosition = i;
  }

  onStarSelect(i: number) {
    if (this.isDisabled) return;
    this.hoveringPosition = undefined;
    this.selectedPosition = i;
    this.handleInput();
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.((this.selectedPosition != null) ? (this.selectedPosition + this.min) : this.selectedPosition);
    this.valueChange.emit((this.selectedPosition != null) ? (this.selectedPosition + this.min) : this.selectedPosition);
  }

}
