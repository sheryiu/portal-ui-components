import { Component, booleanAttribute, forwardRef, input, linkedSignal, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { uniqueId } from 'lodash-es';
import { HoverableDirective } from 'portal-ui-ng/base';

@Component({
  selector: 'pui-toggle',
  imports: [
    HoverableDirective,
  ],
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  /** the id must be passed in as [id]="" instead of id="" */
  id = input<string>(`toggle-${uniqueId()}`)
  inputToggled = input(false, { alias: 'toggled', transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })
  valueChange = output<boolean>();

  isChecked = linkedSignal(() => this.inputToggled());
  isDisabled = linkedSignal<boolean>(() => this.disabled());

  onChange?: (val: boolean) => void;
  onTouched?: () => void;

  handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    this.isChecked.set(target.checked);
    this.onChange?.(this.isChecked());
    this.valueChange.emit(this.isChecked())
  }

  writeValue(obj: any): void {
    this.isChecked.set(booleanAttribute(obj));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

}
