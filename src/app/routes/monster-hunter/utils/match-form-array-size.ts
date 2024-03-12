import { AbstractControl, FormArray, FormControl } from '@angular/forms';

export function matchFormArraySize<C extends AbstractControl, D>(
  formArray: FormArray<C>,
  dataArray: D[],
  newFormControlFn: () => C,
) {
  const diff = dataArray.length - formArray.length;
  if (diff < 0) {
    for (let i = 0; i < -diff; i++) {
      formArray.removeAt(0);
    }
  } else {
    for (let i = 0; i < diff; i++) {
      formArray.insert(0, newFormControlFn());
    }
  }
}