import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, effect, forwardRef, inject, Injector, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { get, set } from 'lodash-es';
import { HoverableDirective, InputFieldComponent } from 'portal-ui-ng/base';
import { Subject } from 'rxjs';
import { AutocompleteModule } from '../../autocomplete';
import { CalendarTriggerDirective } from '../../calendar-trigger';
import { ToggleComponent } from '../../form/toggle';
import { ArrayFieldComponent } from '../array-field/array-field.component';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'pui-fieldset',
  templateUrl: './fieldset.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgTemplateOutlet,
    InputFieldComponent,
    AutocompleteModule,
    CalendarTriggerDirective,
    ArrayFieldComponent,
    HoverableDirective,
    ToggleComponent,
  ],
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

  private injector = inject(Injector)
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
        try {
          fieldDef.key()
        } catch (e) {
          return;
        }
        if (this.formControl.contains(fieldDef.base64Key())) return;
        this.formControl.addControl(fieldDef.base64Key(), this.formBuilder.control({
          disabled: this.isDisabled,
          value: this.formControlValueForField(fieldDef)
        }));
      })
      Object.keys(this.formControl.controls).map(name => {
        if (this.fieldDefs().some(f => f.base64Key() === name)) return;
        this.formControl.removeControl(name);
      })
    })
  }

  private formControlValueForField(fieldDef: FieldDefDirective) {
    let value: any = get(this.currentValue, fieldDef.key())
    if (fieldDef.fieldType() === 'date-time' && value && value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }

  private defaultValueForType(fieldDef: FieldDefDirective) {
    switch (fieldDef.fieldType()) {
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
    for (const key in formValue) {
      if (typeof formValue[key] == 'undefined') continue;
      // only ignore undefined
      // null values should be taken into account
      const fieldDef = this.fieldDefs().find(f => f.base64Key() == key);
      if (!fieldDef) continue;
      let fieldValue = formValue[key];
      try {
        if (fieldDef.fieldType() == 'date-time' && typeof fieldValue == 'string') fieldValue = new Date(fieldValue)
      } catch (e) {
        console.warn(`String cannot be parsed as a date (value: ${ fieldValue })`, e)
      }
      set(newValue, fieldDef.key(), fieldValue)
    }
    this.onChange?.(newValue);
    this.valueChange.emit(newValue);
  }

  protected onSetNotNull(fieldDef: FieldDefDirective) {
    if (!this.formControl.contains(fieldDef.base64Key())) return;
    this.formControl.get(fieldDef.base64Key())?.setValue(fieldDef.defaultValue() ?? this.defaultValueForType(fieldDef));
    this.handleInput();
  }

  protected onSetNull(fieldDef: FieldDefDirective) {
    if (!this.formControl.contains(fieldDef.base64Key())) return;
    this.formControl.get(fieldDef.base64Key())?.setValue(null);
    this.handleInput();
  }

  protected onAutocomplete(fieldDef: FieldDefDirective, value: string | number) {
    if (!this.formControl.contains(fieldDef.base64Key())) return;
    this.formControl.get(fieldDef.base64Key())?.setValue(value);
    this.handleInput();
  }

  protected onDateChange(fieldDef: FieldDefDirective, value: Date) {
    if (!this.formControl.contains(fieldDef.base64Key())) return;
    this.formControl.get(fieldDef.base64Key())?.setValue(value.toISOString());
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
        this.formControl.get(fieldDef.base64Key())?.setValue(this.formControlValueForField(fieldDef));
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
