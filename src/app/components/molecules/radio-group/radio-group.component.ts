import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Directive, ElementRef, Input, QueryList, TemplateRef, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../../atoms/buttons/buttons.module';

@Directive({
  selector: '[appRadioOption]',
  standalone: true,
})
export class RadioOptionDirective<T = unknown> {
  @Input({ required: true, alias: 'appRadioOption' }) value!: T;
  template = inject(TemplateRef);
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ButtonsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-group.component.html',
  host: {
    class: 'ds-radio-group'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    }
  ]
})
export class RadioGroupComponent<T> implements ControlValueAccessor {
  static id = 0;
  @Input() name: string = `appRadioGroup${ RadioGroupComponent.id++ }`;

  @ContentChildren(RadioOptionDirective) options!: QueryList<RadioOptionDirective<T>>;

  onChange?: (val: T | undefined | null) => void;
  onTouched?: () => void;

  formGroup = new FormGroup({
    [this.name]: new FormControl<T | undefined>({
      value: undefined,
      disabled: false,
    })
  })
  constructor() {
  }

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

  onToggle() {
    this.onTouched?.();
    this.onChange?.(this.formGroup.value[this.name]);
  }

}
