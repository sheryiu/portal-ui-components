import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EDITABLE_CONTENT_DEFAULT_CONTROLS, EDITABLE_CONTENT_DIRTY_CONTROLS, ObjectFieldConfiguration } from 'portal-ui-ng';
import { EditableContentDataProvider } from '../../../../../../portal-ui-ng/src/public-api';
import { EmployeeCalendarEventDataService } from '../../../data/employee-calendar-event-data.service';
import { EmployeeCalendarEvent, EmployeeCalendarEventType } from '../../../data/user.types';

@Injectable()
export class EmployeeCalendarEditService implements EditableContentDataProvider<EmployeeCalendarEvent> {
  private dataService = inject(EmployeeCalendarEventDataService);
  private list = toSignal(this.dataService.getList());
  private id = signal<string | undefined>(undefined)

  data = signal<EmployeeCalendarEvent | undefined>(undefined);
  fieldConfiguration = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      employeeId: {
        type: 'string',
        description: 'Employee ID',
      },
      startsFrom: {
        type: 'date-time',
        description: 'Starts From',
      },
      endsAt: {
        type: 'date-time',
        description: 'Ends At',
      },
      isFullDay: {
        type: 'boolean',
        description: 'Full Day',
      },
      label: {
        type: 'string',
        description: 'Label',
      },
      type: {
        type: 'string',
        description: 'Type',
        enum: Object.values(EmployeeCalendarEventType)
      },
    }
  });
  private isDirty = signal(false)
  private updatedValue = signal<EmployeeCalendarEvent | undefined>(undefined)
  controlsConfig = computed(() => {
    if (this.isDirty()) return EDITABLE_CONTENT_DIRTY_CONTROLS
    else return EDITABLE_CONTENT_DEFAULT_CONTROLS
  });

  constructor() {
    effect(() => {
      this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
    }, { allowSignalWrites: true })
  }

  private updateState?: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void;
  registerUpdateState(fn: (state: { isDisabled?: boolean; isDirty?: boolean; }) => void): void {
    this.updateState = fn;
  }

  onStateChange(state: { isValid?: boolean; isDisabled?: boolean; isDirty?: boolean; }): void {
    this.isDirty.update(curr => state.isDirty ?? curr)
  }
  onValueChange(value: EmployeeCalendarEvent): void {
    this.updatedValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'refresh':
      case 'cancel': {
        this.data.set(structuredClone(this.list()?.find(v => v.id == this.id())))
        this.updateState!({ isDirty: false })
        break;
      }
      case 'save': {
        const updatedValue = this.updatedValue()
        if (updatedValue) {
          this.dataService.save(updatedValue)
          this.updateState!({ isDirty: false })
        }
        break;
      }
    }
  }
  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
