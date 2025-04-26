import { computed, Injectable, signal, TemplateRef } from '@angular/core';
import { FilledButtonDirective } from 'portal-ui-ng/base';

export type LayoutControlMode = 'auto' | 'low-emphasis';
export type LayoutControlConfig = {
  id: string;
  label: string;
  isDisabled?: boolean;
  weight?: number;
  mode?: LayoutControlMode;
  icon?: string;
  iconTemplateRef?: TemplateRef<unknown>;
  color?: ReturnType<FilledButtonDirective['color']>;
}

@Injectable()
export class LayoutService {
  private _controls = signal<Array<LayoutControlConfig>>([])
  controls = computed(() => this._controls().toSorted((a, b) => (a.weight ?? 0) - (b.weight ?? 0)));
  mostEmphasizedControlId = computed(() => this.controls().filter(c => !c.mode || c.mode == 'auto').at(-1)?.id)

  private eventsMap: Record<string, {
    click?: (event: MouseEvent) => void;
  }> = {};

  registerControl(
    config: LayoutControlConfig,
    events: {
      click?: (event: MouseEvent) => void;
    }
  ) {
    this._controls.update(curr => [
      ...curr,
      {
        ...config,
      }
    ])
    this.eventsMap[config.id] = events;
    return {
      update: (config: LayoutControlConfig) => {
        this._controls.update(curr => curr.map(c => c.id == config.id ? {...c, ...config} : c))
      },
      dispose: () => {
        this._controls.update(curr => curr.filter(c => c.id != config.id))
      }
    }
  }

  controlOnClick(id: string, event: MouseEvent) {
    this.eventsMap[id]?.click?.(event)
  }
}
