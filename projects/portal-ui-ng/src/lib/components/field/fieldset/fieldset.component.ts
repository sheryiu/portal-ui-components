import { Component, contentChildren, effect, forwardRef, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'pui-fieldset',
  templateUrl: './fieldset.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldsetComponent),
      multi: true,
    },
  ]
})
export class FieldsetComponent<T extends { [key: string | number | symbol]: any }> implements ControlValueAccessor {
  fieldDefs = contentChildren(FieldDefDirective, { descendants: true });

  private formBuilder = inject(FormBuilder);
  formControl = this.formBuilder.record({});
  valueUpdated$ = new Subject<void>();
  valueChange = output<T>();

  constructor() {
    this.valueUpdated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.handleInput();
    })
    effect(() => {
      this.fieldDefs().map(fieldDef => {
        if (this.formControl.contains(fieldDef.key)) return;
        this.formControl.addControl(fieldDef.key, this.formBuilder.control({
          disabled: this.isDisabled,
          value: this.formControlValueForField(fieldDef)
        }));
      })
      Object.keys(this.formControl.controls).map(name => {
        if (this.fieldDefs().some(f => f.key === name)) return;
        this.formControl.removeControl(name);
      })
    })
  }

  private formControlValueForField(fieldDef: FieldDefDirective) {
    const paths = fieldDef.key.split('>');
    let value: any = this.currentValue;
    for (const path of paths) {
      if (value == null) return null;
      if (!(path in value)) return null;
      if (typeof value[path] === 'function') return null;
      value = value[path];
    }
    if (fieldDef.fieldType === 'date-time' && value && value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }

  private defaultValueForType(fieldDef: FieldDefDirective) {
    switch (fieldDef.fieldType) {
      case 'string': return '';
      case 'number': return 0;
      case 'date-time': return new Date().toISOString();
      case 'boolean': return false;
      case 'array': return [];
      // TODO
      default: return '';
    }
  }

  handleInput() {
    let newValue: any = structuredClone(this.currentValue);
    if (newValue == null) newValue = {};
    const formValue = this.formControl.getRawValue();
    try {
      for (const key in formValue) {
        if (typeof formValue[key] == 'undefined') continue;
        // only ignore undefined
        // null values should be taken into account
        let currPointingTo = newValue;
        const paths = key.split('>');
        let i = 0;
        for (const path of paths.slice(0, -1)) {
          if (/^\d+$/.test(paths.at(i + 1)!)) {
            if (currPointingTo[path] == null) {
              currPointingTo[path] = [];
              currPointingTo = currPointingTo[path];
            } else {
              currPointingTo = currPointingTo[path];
              Object.seal(currPointingTo); // prevents items from added to the array
            }
          } else {
            try {
              if (currPointingTo[path] == null) currPointingTo[path] = {};
            } catch (e) { /* ignores as this is purposefully caused by the Object.seal */ }
            currPointingTo = currPointingTo[path];
          }
          i++;
        }
        try {
          let fieldValue = formValue[key];
          if (this.fieldDefs().find(def => def.key == key)?.fieldType == 'date-time' && typeof fieldValue == 'string') fieldValue = new Date(fieldValue)
          currPointingTo[paths.at(-1)!] = fieldValue;
        } catch (e) { /* ignores as this is purposefully caused by the Object.seal */ }
      }
      this.onChange?.(newValue);
      this.valueChange.emit(newValue);
    } catch (e) {
      console.warn('Unexpected error', e)
      // ignore
    }
  }

  protected onSetNotNull(fieldDef: FieldDefDirective) {
    if (!this.formControl.contains(fieldDef.key)) return;
    this.formControl.get(fieldDef.key)?.setValue(fieldDef.defaultValue ?? this.defaultValueForType(fieldDef));
    this.handleInput();
  }

  protected onSetNull(fieldDef: FieldDefDirective) {
    if (!this.formControl.contains(fieldDef.key)) return;
    this.formControl.get(fieldDef.key)?.setValue(null);
    this.handleInput();
  }

  protected onAutocomplete(fieldDef: FieldDefDirective, value: string | number) {
    if (!this.formControl.contains(fieldDef.key)) return;
    this.formControl.get(fieldDef.key)?.setValue(value);
    this.handleInput();
  }

  protected onDateChange(fieldDef: FieldDefDirective, value: Date) {
    if (!this.formControl.contains(fieldDef.key)) return;
    this.formControl.get(fieldDef.key)?.setValue(value.toISOString());
    this.handleInput();
  }

  //#region ControlValueAccessor
  private currentValue: T | null | undefined;
  writeValue(obj: T | null | undefined): void {
    this.currentValue = structuredClone(obj);
    if (this.currentValue == null) {
      this.formControl.reset();
    } else {
      this.fieldDefs()?.forEach(fieldDef => {
        this.formControl.get(fieldDef.key)?.setValue(this.formControlValueForField(fieldDef));
      })
    }
  }
  protected onChange?: (val: T) => void;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  protected onTouched?: () => void;
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  protected isDisabled: boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
  //#endregion
}
