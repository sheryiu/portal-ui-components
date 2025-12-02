import { Component, input, linkedSignal, output } from '@angular/core';
import { HoverableDirective, InputFieldComponent } from 'portal-ui-ng/base';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'pui-array-field',
  templateUrl: './array-field.component.html',
  imports: [
    InputFieldComponent,
    HoverableDirective,
  ],
  host: {
    class: 'pui-array-field'
  }
})
export class ArrayFieldComponent {
  def = input.required<FieldDefDirective>()
  inputLength = input<number>(undefined, { alias: 'length' });
  length = linkedSignal(() => this.inputLength())
  valueChange = output<number>();
  isDisabled = input<boolean>(false, { alias: 'disabled' });

  handleInput(event: Event) {
    if (event.currentTarget instanceof HTMLInputElement && event.currentTarget.type == 'number') {
      const newL = event.currentTarget.valueAsNumber;
      if (isNaN(newL) || newL < 0 || newL % 1 != 0) {
        return;
      }
      this.length.set(newL);
      this.valueChange.emit(newL);
    }
  }

  onMinusClick() {
    this.length.update(l => l == null ? undefined : l > 0 ? l - 1 : l);
    const newL = this.length();
    if (newL != null) {
      this.valueChange.emit(newL);
    }
  }

  onAddClick() {
    this.length.update(l => l == null ? undefined : l + 1);
    const newL = this.length();
    if (newL != null) {
      this.valueChange.emit(newL);
    }
  }
}
