import { InjectionToken, Signal } from '@angular/core';
import { Params } from '@angular/router';
import { ObjectFieldConfiguration } from '../field-configuration';
import { LayoutControlConfig } from '../layout/layout.service';

export interface EditableContentDataProvider<T> {
  onParamsChange?(params: Params, queryParams: Params): void;
  // data
  data: Signal<T | null | undefined>;
  fieldConfiguration: Signal<ObjectFieldConfiguration>;
  registerUpdateState?(fn: (state: { isDisabled?: boolean; isDirty?: boolean }) => void): void;
  onStateChange?(state: {
    isValid?: boolean;
    isDisabled?: boolean;
    isDirty?: boolean;
  }): void;
  onValueChange?(value: T): void;
  // controls
  controlsConfig?: Signal<ReadonlyArray<LayoutControlConfig>>;
  onControlClick?(key: string, event: MouseEvent): void;
}

export const EDITABLE_CONTENT_DEFAULT_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'refresh',
    label: 'Refresh',
    icon: 'refresh',
    mode: 'low-emphasis'
  }
]
export const EDITABLE_CONTENT_DIRTY_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'cancel',
    label: 'Cancel',
    icon: 'close',
    mode: 'low-emphasis'
  },
  {
    id: 'save',
    label: 'Save',
    icon: 'save'
  }
]
export const EDITABLE_CONTENT_DATA_PROVIDER = new InjectionToken<EditableContentDataProvider<any>>('editable content data provider')