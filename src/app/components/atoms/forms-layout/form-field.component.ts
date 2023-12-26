import { AfterContentInit, Component, ContentChildren, DestroyRef, HostBinding, Input, Optional, QueryList, booleanAttribute, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlDirective, FormControlName } from '@angular/forms';
import { combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { BaseFormDirective } from './base-form.directive';

@Component({
  selector: 'dd[appFormField], app-form-field',
  standalone: true,
  host: {
    class: 'ds-form-field'
  },
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class FormFieldComponent implements AfterContentInit {

  @HostBinding('class.ds-form-field-dirty')
  @Input({ transform: booleanAttribute })
  private isDirty: boolean = false;

  @HostBinding('class.ds-form-field-hidden-border')
  @Input({ transform: booleanAttribute })
  private noBorder: boolean = false;

  @HostBinding('class.ds-form-field-readonly')
  @Input({ transform: booleanAttribute })
  private readonly: boolean = false;

  @ContentChildren(FormControlName, { descendants: true }) childFCName!: QueryList<FormControlName>;
  @ContentChildren(FormControlDirective, { descendants: true }) childFCDirective!: QueryList<FormControlDirective>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    @Optional() private parent: BaseFormDirective,
  ) {
    if (parent == null) console.warn('ds-form-field must be used within a base-form')
  }

  ngAfterContentInit(): void {
    combineLatest({
      fcName: this.childFCName.changes.pipe(
        startWith(0),
        map(() => this.childFCName.toArray()),
      ),
      fcDirective: this.childFCDirective.changes.pipe(
        startWith(0),
        map(() => this.childFCDirective.toArray()),
      ),
    }).pipe(
      switchMap(({ fcDirective, fcName }) => combineLatest([
        ...fcDirective.map(fc => fc.valueChanges?.pipe(startWith(fc.value), map(() => !!fc.dirty)) ?? of(false)),
        ...fcName.map(fc => fc.valueChanges?.pipe(startWith(fc.value), map(() => !!fc.dirty)) ?? of(false)),
      ])),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((isDirtyArray) => {
      this.isDirty = isDirtyArray.some(d => d);
    })
  }

}