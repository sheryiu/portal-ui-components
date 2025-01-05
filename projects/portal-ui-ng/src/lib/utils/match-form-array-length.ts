import { FormArray, FormControl } from '@angular/forms';

export function matchFormArrayLength<T>(formArray: FormArray<FormControl<T>>, targetLength: number, defaultValue: () => T = () => (null as any)) {
  if (formArray.length > targetLength) {
    Array(formArray.length - targetLength).fill(0).forEach(() => formArray.removeAt(-1))
  } else if (formArray.length < targetLength) {
    Array(targetLength - formArray.length).fill(0).forEach(() => formArray.push(new FormControl<T>(defaultValue(), { nonNullable: true })))
  }
}