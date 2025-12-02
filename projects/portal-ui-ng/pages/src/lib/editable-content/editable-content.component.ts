import { Component, computed, effect, inject, input, linkedSignal, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FieldModule, PreventDirtyLeaveComponent } from 'portal-ui-ng/components';
import { combineLatest } from 'rxjs';
import { flatten } from '../field-configuration';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { EDITABLE_CONTENT_DATA_PROVIDER, EDITABLE_CONTENT_DEFAULT_CONTROLS, EditableContentDataProvider } from './editable-content';

@Component({
  selector: 'pui-editable-content',
  imports: [
    FieldModule,
    LayoutControlDirective,
  ],
  templateUrl: './editable-content.component.html',
  host: {
    class: 'pui-editable-content',
  }
})
export class EditableContentComponent<T extends { [key: string | number | symbol]: any }> implements PreventDirtyLeaveComponent {
  private route = inject(ActivatedRoute);
  private dataProvider = inject(EDITABLE_CONTENT_DATA_PROVIDER) as EditableContentDataProvider<T>

  protected data = linkedSignal(() => this.dataProvider.data())
  protected fieldConfiguration = computed(() => this.dataProvider.fieldConfiguration())

  protected flattenedControls = computed(() => {
    const fieldConfiguration = this.fieldConfiguration();
    const data = this.data();
    if (!fieldConfiguration) return [];
    const flattened = flatten(
      fieldConfiguration,
      data,
      '',
      fieldConfiguration.description ? `${fieldConfiguration.description} / ` : ''
    );
    return flattened;
  })
  protected controlsConfig = computed(() => {
    return this.dataProvider.controlsConfig?.() ?? EDITABLE_CONTENT_DEFAULT_CONTROLS;
  })

  isDirty = signal(false)
  isDisabled = input<boolean>(false, { alias: 'disabled' });
  /** @internal */
  disabled = linkedSignal(() => this.isDisabled());

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider.onParamsChange?.(p, qp))
    this.dataProvider.registerUpdateState?.((state) => {
      untracked(() => {
        if (state?.isDirty === false) this.isDirty.set(false);
        else if (state?.isDirty === true) this.isDirty.set(true);
        if (state?.isDisabled === false) this.disabled.set(false);
        else if (state?.isDisabled === true) this.disabled.set(true);
      })
    })
    effect(() => {
      const isDirty = this.isDirty();
      untracked(() => {
        this.dataProvider.onStateChange?.({
          isDirty
        })
      })
    })
  }

  protected onControlClick(id: string, event: MouseEvent) {
    this.dataProvider.onControlClick?.(id, event)
  }

  protected onValueChange(value: T | null | undefined) {
    this.data.set(value)
    this.isDirty.set(true)
    this.dataProvider.onValueChange?.(value)
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.dataProvider.configuration?.isEnterToSubmit === true) {
      this.dataProvider.onControlClick?.('save', event)
    }
  }

}
