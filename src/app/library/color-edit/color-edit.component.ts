import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import Color from 'color';
import { SharedModule } from '../../shared/shared.module';
import { COLOR_EDIT_OPTIONS, ColorEditOptions } from './color-edit';

@Component({
  selector: 'core-color-edit',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  host: {
    class: 'core-color-edit',
  },
  templateUrl: './color-edit.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorEditComponent),
      multi: true,
    }
  ],
})
export class ColorEditComponent implements ControlValueAccessor {
  onChange?: (v: string | null | undefined) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  @Input() set value(v: string | null | undefined) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<string | null | undefined>();

  options = inject(COLOR_EDIT_OPTIONS, { optional: true }) ?? {
    presets: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
  } as ColorEditOptions;

  colorValue = null as null | string;

  writeValue(obj: string | null | undefined): void {
    if (obj) {
      this.colorValue = Color(obj).hex();
    } else {
      this.colorValue = null;
    }
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

  handleInput(input: HTMLInputElement) {
    this.selectColor(input.value)
  }

  selectColor(color: string) {
    this.colorValue = color;
    this.onTouched?.();
    this.onChange?.(this.colorValue);
    this.valueChange.emit(this.colorValue);
  }

}
