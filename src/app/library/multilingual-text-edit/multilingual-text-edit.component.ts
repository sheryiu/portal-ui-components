import { Component, EventEmitter, InjectionToken, Input, Output, forwardRef, inject, makeEnvironmentProviders } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

type ValueType = Record<string, string | null | undefined>;

export const MULTILINGUAL_LANGUAGES = new InjectionToken<string[]>('multilingual languages');

export function provideMultilingual(langs: string[]) {
  return makeEnvironmentProviders([
    {
      provide: MULTILINGUAL_LANGUAGES,
      useValue: langs,
    }
  ])
}

@Component({
  selector: 'core-multilingual-text-edit',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './multilingual-text-edit.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultilingualTextEditComponent),
      multi: true,
    }
  ]
})
export class MultilingualTextEditComponent implements ControlValueAccessor {
  onChange?: (v: ValueType) => void;
  onTouched?: () => void;
  isDisabled?: boolean;

  @Input() set value(v: ValueType) {
    this.writeValue(v);
  }
  @Output() valueChange = new EventEmitter<ValueType>();

  langs = inject(MULTILINGUAL_LANGUAGES);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.record(this.langs.reduce(
    (acc, lang) => ({ ...acc, [lang]: null }),
    {} as Record<string, string | null | undefined>
  ));

  writeValue(obj: ValueType): void {
    this.formGroup.reset(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
    this.isDisabled = isDisabled;
  }

  handleInput() {
    if (this.isDisabled) return;
    this.onChange?.(this.formGroup.getRawValue());
    this.valueChange.emit(this.formGroup.getRawValue());
  }

}
