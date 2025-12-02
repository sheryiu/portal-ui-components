import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, input, linkedSignal, output } from '@angular/core';
import { cloneDeep, get, set } from 'lodash-es';
import { LodashGetPipe } from 'portal-ui-ng';
import { HoverableDirective, InputFieldComponent } from 'portal-ui-ng/base';
import { AutocompleteModule } from '../../autocomplete';
import { CalendarTriggerDirective } from '../../calendar-trigger';
import { TimeDisplayComponent } from "../../form/time-display/time-display.component";
import { ToggleComponent } from '../../form/toggle';
import { ArrayFieldComponent } from '../array-field/array-field.component';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'pui-fieldset',
  templateUrl: './fieldset.component.html',
  imports: [
    NgClass,
    NgTemplateOutlet,
    InputFieldComponent,
    AutocompleteModule,
    CalendarTriggerDirective,
    ArrayFieldComponent,
    HoverableDirective,
    ToggleComponent,
    TimeDisplayComponent,
    LodashGetPipe
  ]
})
export class FieldsetComponent<T extends { [key: string | number | symbol]: any }> {
  fieldDefs = contentChildren(FieldDefDirective, { descendants: true });

  inputValue = input<T | null | undefined>(undefined, { alias: 'value' });
  isDisabled = input<boolean>(false, { alias: 'disabled' });

  /** @internal */
  formValue = linkedSignal({
    source: () => {
      return [this.fieldDefs(), this.inputValue()] as const;
    },
    computation: (source, prev: { source: readonly [ReadonlyArray<FieldDefDirective>, T | null | undefined], value: Record<string, any> } | undefined) => {
      const newValue = {} as T;
      const [fieldDefs, value] = source;
      for (const fieldDef of fieldDefs) {
        const key = fieldDef.key();
        const valueOfField = get(value, key);
        set(newValue, key, valueOfField)
      }
      console.debug('fieldset component new value computed', newValue)
      return newValue;
    }
  })

  valueChange = output<T | null | undefined>();

  private defaultValueForType(fieldDef: FieldDefDirective) {
    switch (fieldDef.fieldType()) {
      case 'string': return '';
      case 'number': return 0;
      case 'date-time': return new Date();
      case 'boolean': return false;
      case 'array': return [];
    }
    throw new Error(`Unsupported field type: ${ fieldDef.fieldType() }`);
  }

  handleInput(fieldDef: FieldDefDirective, event: any) {
    if (event instanceof InputEvent && event.isComposing) return;
    let newValue = (cloneDeep(this.formValue()) as T | null | undefined) ?? {} as T;
    const key = fieldDef.key();
    switch (fieldDef.fieldType()) {
      case 'string':
        const inputElement = event?.currentTarget;
        if (inputElement instanceof HTMLInputElement) {
          set(newValue, key, inputElement.value);
        }
        break;
      case 'number':
        const numberInputElement = event?.currentTarget;
        if (numberInputElement instanceof HTMLInputElement && numberInputElement.type == 'number') {
          set(newValue, key, numberInputElement.valueAsNumber);
        }
        break;
      case 'boolean':
        if (typeof event == 'boolean') {
          set(newValue, key, event);
        }
        break;
      case 'date-time':
        if (event instanceof Date || event === null) {
          set(newValue, key, event);
        }
        break;
      case 'array':
        if (typeof event == 'number' && event >= 0) {
          const currentArray = get(newValue, key) as any;
          if (Array.isArray(currentArray)) {
            console.log(currentArray, event)
            if (event > currentArray.length) {
              const newArray = currentArray.toSpliced(currentArray.length, 0, ...Array(event - currentArray.length).fill(null));
              set(newValue, key, newArray);
            } else if (event < currentArray.length) {
              const newArray = currentArray.toSpliced(event, currentArray.length - event);
              set(newValue, key, newArray);
            }
          } else if (currentArray == null) {
            set(newValue, key, Array(event).fill(null));
          } else {
            console.error(`Value of path(${ key }) is not an array:`, currentArray);
          }
        }
        break;
    }
    this.valueChange.emit(newValue);
  }

  protected onSetNotNull(fieldDef: FieldDefDirective) {
    let newValue = (cloneDeep(this.formValue()) as T | null | undefined) ?? {} as T;
    const key = fieldDef.key();
    set(newValue, key, fieldDef.defaultValue() ?? this.defaultValueForType(fieldDef));
    this.valueChange.emit(newValue);
  }

  protected onSetNull(fieldDef: FieldDefDirective) {
    let newValue = (cloneDeep(this.formValue()) as T | null | undefined) ?? {} as T;
    const key = fieldDef.key();
    set(newValue, key, null);
    this.valueChange.emit(newValue);
  }

  protected onAutocomplete(fieldDef: FieldDefDirective, autocompleteValue: string | number) {
    let newValue = (cloneDeep(this.formValue()) as T | null | undefined) ?? {} as T;
    const key = fieldDef.key();
    set(newValue, key, autocompleteValue);
    this.valueChange.emit(newValue);
  }
}