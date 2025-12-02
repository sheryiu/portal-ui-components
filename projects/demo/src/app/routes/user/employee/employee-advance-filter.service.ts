import { inject, Injectable, signal } from '@angular/core';
import { OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng/base';
import { ActionDrawerLayoutDataProvider, EditableContentComponent, EditableContentDataProvider, LayoutControlConfig, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { EmployeeDepartment, EmployeeStatus } from '../../../data/user.types';

@Injectable()
export class EmployeeAdvanceFilterService implements ActionDrawerLayoutDataProvider, EditableContentDataProvider<any> {
  private overlayData = inject(OVERLAY_DATA, { optional: true }) as any;

  configuration = {
    content: EditableContentComponent,
    isEnterToSubmit: true,
  }

  // ActionDrawerLayoutDataProvider
  heading = signal("Filter Employee")
  private overlayRef!: PuiOverlayRef;
  onActionDrawerInit(overlayRef: PuiOverlayRef): void {
    this.overlayRef = overlayRef;
  }

  // EditableContentDataProvider
  data = signal(this.overlayData?.['filter'] ?? {});
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      department: {
        type: 'string',
        description: 'Department',
        enum: [''].concat(Object.values(EmployeeDepartment))
      },
      status: {
        type: 'string',
        description: 'Status',
        enum: [''].concat(Object.values(EmployeeStatus))
      }
    }
  })
  controlsConfig = signal<LayoutControlConfig[]>([
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'close'
    },
    {
      id: 'apply',
      label: 'Apply',
      icon: 'filter_alt'
    }
  ]);
  private updatedValue = signal<any>(undefined)

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
    this.updateState({ isDirty: true })
  }
  onValueChange(value: any): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'cancel': {
        this.overlayRef.close()
        break;
      }
      case 'apply': {
        const updatedValue = this.updatedValue();
        if (updatedValue) {
          this.overlayData?.['onFilterApply']?.(updatedValue)
          this.overlayRef.close()
        }
        break;
      }
    }
  }
}
