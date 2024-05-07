import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputFieldDirective } from '../../../base';

@Component({
  selector: 'phead-table-filter-by-text',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldDirective,
  ],
  templateUrl: './table-filter-by-text.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableFilterByTextComponent),
      multi: true,
    }
  ]
})
export class TableFilterByTextComponent implements ControlValueAccessor {
  onChange?: (v: string | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  formControl = inject(FormBuilder).nonNullable.control(null as unknown as string | null | undefined);

  @Input() set value(v: string | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<string | null | undefined>();

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
    let value = this.formControl.getRawValue();
    if (value?.trim().length === 0) {
      value = null;
    }
    this.onChange?.(value);
    this.valueChange.emit(value);
  }

}
