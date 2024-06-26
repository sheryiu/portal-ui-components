import { Component, Input, booleanAttribute, forwardRef, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { nanoid } from 'nanoid';
import { HoverableDirective } from '../../../base';

@Component({
  selector: 'pui-toggle',
  standalone: true,
  imports: [
    HoverableDirective,
  ],
  templateUrl: './toggle.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input() id: string = nanoid();
  isChecked$$ = signal<boolean>(false);
  isDisabled$$ = signal<boolean>(false);
  onChange?: (val: boolean) => void;
  onTouched?: () => void;
  valueChange = output<boolean>();

  handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    this.isChecked$$.set(target.checked);
    this.onChange?.(this.isChecked$$());
    this.valueChange.emit(this.isChecked$$())
  }

  writeValue(obj: any): void {
    this.isChecked$$.set(booleanAttribute(obj));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled$$.set(isDisabled);
  }

}
