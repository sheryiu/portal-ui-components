import { Component, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormBuilder, FormControl, FormRecord } from '@angular/forms';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'pui-array-field',
  templateUrl: './array-field.component.html',
  styles: ``,
  host: {
    class: 'pui-array-field'
  }
})
export class ArrayFieldComponent {
  def = input.required<FieldDefDirective>()
  formRecord = inject(ControlContainer).control as FormRecord<FormControl<unknown>>;
  valueChange = output();

  arrayLengthControl = inject(FormBuilder).nonNullable.control(0);

  constructor() {
    effect(() => {
      const value = this.formRecord.controls[this.def().key].getRawValue();
      this.arrayLengthControl.setValue(Array.isArray(value) ? value.length : 0);
    })
    this.formRecord.events.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      const value = this.formRecord.controls[this.def().key].getRawValue();
      this.arrayLengthControl.setValue(Array.isArray(value) ? value.length : 0);
    })
  }

  handleInput() {
    const currValue = this.formRecord.controls[this.def().key].getRawValue();
    if (!Array.isArray(currValue)) {
      console.warn(`Value of ${ this.def().key } is not an array: ${ JSON.stringify(currValue) }`)
      return;
    }
    if (this.arrayLengthControl.value < 0) return;
    let newValue = currValue;
    while (newValue.length < this.arrayLengthControl.value) {
      newValue = newValue.toSpliced(newValue.length, 0, null);
    }
    while (newValue.length > this.arrayLengthControl.value) {
      newValue = newValue.toSpliced(newValue.length - 1, 1);
    }
    this.formRecord.controls[this.def().key].setValue(newValue)
    this.valueChange.emit();
  }

  onMinusClick() {
    if (this.arrayLengthControl.value <= 0) return;
    this.arrayLengthControl.setValue(this.arrayLengthControl.value - 1);
    this.handleInput();
  }

  onAddClick() {
    this.arrayLengthControl.setValue(this.arrayLengthControl.value + 1);
    this.handleInput();
  }
}