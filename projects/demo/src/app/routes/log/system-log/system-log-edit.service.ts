import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EditableContentDataProvider, ObjectFieldConfiguration } from 'portal-ui-ng/pages';
import { SystemLog, SystemLogLevel } from '../../../data/log.types';
import { SystemLogDataService } from '../../../data/system-log-data.service';

@Injectable()
export class SystemLogEditService implements EditableContentDataProvider<SystemLog> {
  private dataService = inject(SystemLogDataService);
  private id = signal<string | undefined>(undefined);
  private rawData = toSignal(this.dataService.getList())
  private isDirty = signal(false);
  private updatedValue = signal<any>(undefined);

  data = signal<SystemLog | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      timestamp: {
        type: 'date-time',
        description: 'Timestamp',
      },
      message: {
        type: 'string',
        description: 'Message'
      },
      level: {
        type: 'string',
        description: 'Level',
        enum: Object.values(SystemLogLevel)
      },
      context: {
        type: 'string',
        description: 'Context'
      },
      customerId: {
        type: 'string',
        description: 'Customer ID'
      },
      employeeId: {
        type: 'string',
        description: 'Employee ID'
      },
      ipAddress: {
        type: 'string',
        description: 'IP Address'
      },
      detail: {
        type: 'string',
        description: 'Detail'
      },
    }
  });
  controlsConfig = signal(EDITABLE_CONTENT_DEFAULT_CONTROLS);

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.rawData()?.find(v => v.id == this.id())))
    }, { allowSignalWrites: true })
  }

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
        this.data.set(structuredClone(this.rawData()?.find(v => v.id == this.id())))
        break;
      }
    }
  }
  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }

}
