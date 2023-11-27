import { AfterViewInit, ContentChildren, DestroyRef, Directive, HostBinding, Input, Optional, booleanAttribute, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import { BaseFormDirective } from './base-form.directive';

@Directive({
  selector: 'dd[appFormField], app-form-field',
  standalone: true,
  host: {
    class: 'ds-form-field'
  }
})
export class FormFieldDirective implements AfterViewInit {

  @HostBinding('class.ds-form-field-dirty')
  @Input({ transform: booleanAttribute })
  private isDirty: boolean = false;

  constructor(
    @Optional() private parent: BaseFormDirective,
  ) {
    if (parent == null) console.warn('ds-form-field must be used within a base-form')
  }

  private _destroyRef = inject(DestroyRef);
  private _parentControl = inject(ControlContainer, { host: true, self: true, optional: true });

  ngAfterViewInit(): void {
    this._parentControl?.control?.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => {
      this.isDirty = !!this._parentControl?.control?.dirty;
    })
  }

}
