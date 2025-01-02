import { computed, Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng';

@Injectable()
export class SystemLogEditService implements EditableContentDataProvider<SystemLog> {
  private id = signal<string | undefined>(undefined);
  private isDirty = signal(false);
  private updatedValue = signal<any>(undefined);

  data = signal<SystemLog | undefined>(
    undefined
    // TODO supply with data
  );
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      // TODO fields configuration
    }
  });
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS;
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS;
  });

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
  }

  onStateChange(state: { isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }): void {
    this.isDirty.update(isDirty => state.isDirty ?? isDirty)
  }
  onValueChange(value: any): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'refresh': {
        // TODO on refresh click
        break;
      }
      case 'cancel': {
        // TODO on refresh click
        this.updateState!({ isDirty: false });
        break;
      }
      case 'save': {
        // TODO on save click
        this.updateState!({ isDirty: false });
        break;
      }
    }
  }
  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }

}
