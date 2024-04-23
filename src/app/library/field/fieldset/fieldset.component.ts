import { AfterContentInit, Component, ContentChildren, DestroyRef, QueryList, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'core-fieldset',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fieldset.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldsetComponent),
      multi: true,
    }
  ]
})
export class FieldsetComponent<T extends {}> implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(FieldDefDirective, { emitDistinctChangesOnly: true }) private _fieldDefs!: QueryList<FieldDefDirective>;
  fieldDefs?: FieldDefDirective[];
  private destroyRef = inject(DestroyRef);

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.record({})

  ngAfterContentInit(): void {
    this._fieldDefs.changes.pipe(
      startWith(null),
      map(() => this._fieldDefs.toArray()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(fieldDefs => {
      fieldDefs.forEach(fieldDef => {
        if (this.form.contains(fieldDef.key)) return;
        this.form.addControl(fieldDef.key, this.formBuilder.control({
          disabled: this.isDisabled,
          value: this.formControlValueForField(fieldDef)
        }));
      })
      Object.keys(this.form.controls).forEach(name => {
        if (fieldDefs.some(f => f.key === name)) return;
        this.form.removeControl(name);
      })
      this.fieldDefs = fieldDefs;
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
    return value;
  }

  //#region ControlValueAccessor
  private currentValue: T | null | undefined;
  writeValue(obj: T | null | undefined): void {
    this.currentValue = obj;
    if (this.currentValue == null) {
      this.form.reset();
    } else {
      this.fieldDefs?.forEach(fieldDef => {
        this.form.get(fieldDef.key)?.setValue(this.formControlValueForField(fieldDef));
      })
    }
  }
  onChange?: () => void;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  onTouched?: () => void;
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  isDisabled: boolean = false;
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.isDisabled ? this.form.disable() : this.form.enable();
  }
  //#endregion
}
