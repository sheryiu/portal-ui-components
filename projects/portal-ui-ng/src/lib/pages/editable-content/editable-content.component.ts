import { Component, computed, effect, inject, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ValueChangeEvent } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { FieldModule } from '../../components';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { EDITABLE_CONTENT_DATA_PROVIDER, EDITABLE_CONTENT_DEFAULT_CONTROLS, EditableContentDataProvider, JsonSchema, ObjectJsonSchema } from './editable-content';

/** @internal */
export function flattenObjectJsonSchema(jsonSchema: ObjectJsonSchema, data: any, keyPrefix: string, descriptionPrefix: string): Array<{ key: string; jsonSchema: JsonSchema; }> {
  const entries = Object.entries(jsonSchema.properties);
  return entries.flatMap(([key, value]) => {
    if (value.type == 'object') return flattenObjectJsonSchema(value, data, `${keyPrefix}${key}>`, `${descriptionPrefix}${value.description??''} / `);
    if (value.type == 'array') {
      const propertyKey = keyPrefix + key;
      const description = descriptionPrefix + value.description;
      const paths = propertyKey.split('>');
      let currPointingTo = data;
      for (const path of paths) {
        if (currPointingTo?.[path] == null) break;
        if (/^\d+$/.test(path)) {
          currPointingTo = currPointingTo[path];
        } else {
          currPointingTo = currPointingTo[path];
        }
      }
      return [
        {
          key: propertyKey,
          jsonSchema: {
            ...value,
            description,
          }
        },
        ...(Array.isArray(currPointingTo)
          ? currPointingTo.flatMap((_, i) => value.items.type == 'object'
            ? [...flattenObjectJsonSchema(value.items, data, `${propertyKey}>${i}>`, `${description} / #${i} / `)]
            : [{
              key: propertyKey + '>' + i,
              jsonSchema: {
                ...value.items,
                description: description + '#' + i + ' / ' + value.description,
              }
            }])
          : [])
      ]
    }
    return [
      {
        key: keyPrefix + key,
        jsonSchema: {
          ...value,
          description: descriptionPrefix + value.description,
        }
      }
    ]
  })
}

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
  protected jsonSchema = computed(() => this.dataProvider.jsonSchema())
  private formControlValue = toSignal(this.formControl.events.pipe(filter(e => e instanceof ValueChangeEvent), map(e => e.value)));
  protected flattenedControls = computed(() => {
    const jsonSchema = this.jsonSchema();
    const data = this.formControlValue();
    if (!jsonSchema) return [];
    const flatten = flattenObjectJsonSchema(jsonSchema, data, '', jsonSchema.description ? `${jsonSchema.description} / ` : '');
    return flatten;
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
    this.route.params.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider.params?.set(params);
    })
    this.route.queryParams.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider.queryParams?.set(params);
    })
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
