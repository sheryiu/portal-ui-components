import { Component, computed, effect, inject, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ValueChangeEvent } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { FieldModule } from '../../components';
import { flatten } from '../field-configuration';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { EDITABLE_CONTENT_DATA_PROVIDER, EDITABLE_CONTENT_DEFAULT_CONTROLS, EditableContentDataProvider } from './editable-content';

@Component({
  selector: 'pui-editable-content',
  standalone: true,
  imports: [
    FieldModule,
    LayoutControlDirective,
  ],
  templateUrl: './editable-content.component.html',
  styles: ``,
  host: {
    class: 'pui-editable-content',
  }
})
export class EditableContentComponent<T extends { [key: string | number | symbol]: any }> {
  private route = inject(ActivatedRoute);
  private dataProvider = inject(EDITABLE_CONTENT_DATA_PROVIDER) as EditableContentDataProvider<T>

  protected formControl = new FormControl<T | undefined>(undefined)

  protected data = computed(() => this.dataProvider.data())
  protected fieldConfiguration = computed(() => this.dataProvider.fieldConfiguration())
  private formControlValue = toSignal(this.formControl.events.pipe(filter(e => e instanceof ValueChangeEvent), map(e => e.value)));
  protected flattenedControls = computed(() => {
    const fieldConfiguration = this.fieldConfiguration();
    const data = this.formControlValue();
    if (!fieldConfiguration) return [];
    const flattened = flatten(fieldConfiguration, data, '', fieldConfiguration.description ? `${fieldConfiguration.description} / ` : '');
    return flattened;
  })
  protected controlsConfig = computed(() => {
    return this.dataProvider.controlsConfig?.() ?? EDITABLE_CONTENT_DEFAULT_CONTROLS;
  })

  constructor() {
    effect(() => {
      const data = this.data();
      untracked(() => this.formControl.setValue(data))
    })
    effect(() => {
      const value = this.formControlValue();
      untracked(() => this.dataProvider.onValueChange?.(value))
    })
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider.onParamsChange?.(p, qp))
    this.formControl.events.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.dataProvider.onStateChange?.({
        isValid: this.formControl.valid,
        isDisabled: this.formControl.disabled,
        isDirty: this.formControl.dirty,
      })
    })
    this.dataProvider.registerUpdateState?.((state) => {
      untracked(() => {
        if (state?.isDirty === false) this.formControl.markAsPristine();
        else if (state?.isDirty === true) this.formControl.markAsDirty();
        if (state?.isDisabled === false) this.formControl.enable();
        else if (state?.isDisabled === true) this.formControl.disable();
      })
    })
  }

  protected onControlClick(id: string, event: MouseEvent) {
    this.dataProvider.onControlClick?.(id, event)
  }
}
