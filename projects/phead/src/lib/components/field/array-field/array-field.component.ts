import { Component, effect, inject, input, output } from '@angular/core';
import { ControlContainer, FormControl, FormRecord } from '@angular/forms';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'phead-array-field',
  templateUrl: './array-field.component.html',
  styles: ``
})
export class ArrayFieldComponent {
  def = input.required<FieldDefDirective>()
  formRecord = inject(ControlContainer).control as FormRecord<FormControl<unknown>>;
  valueChange = output();

  constructor() {
    console.log(this.formRecord)
    effect(() => {
      console.log(this.formRecord.controls[this.def().key])
    })
  }

  onAddClick() {
    const currValue = this.formRecord.controls[this.def().key].getRawValue();
    if (!Array.isArray(currValue)) {
      console.warn(`Value of ${ this.def().key } is not an array: ${ JSON.stringify(currValue) }`)
      return;
    }
    const newValue = currValue.toSpliced(currValue.length, 0, null);
    this.formRecord.controls[this.def().key].setValue(newValue)
    this.valueChange.emit();
  }
}
