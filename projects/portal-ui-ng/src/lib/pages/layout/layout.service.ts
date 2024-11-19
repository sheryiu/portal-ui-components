import { computed, Injectable, signal, TemplateRef } from '@angular/core';

export type LayoutControlMode = 'auto' | 'low-emphasis';
export type LayoutControlConfig = {
  id: symbol;
  label: string;
  isDisabled: boolean;
  weight: number;
  mode: LayoutControlMode;
  icon?: string;
  iconTemplateRef?: TemplateRef<unknown>;
}

@Injectable()
export class LayoutService {
  private _controls = signal<Array<LayoutControlConfig>>([])
  controls = computed(() => this._controls().toSorted((a, b) => a.weight - b.weight));
  mostEmphasizedControlId = computed(() => this.controls().filter(c => c.mode == 'auto').at(-1)?.id)

  private eventsMap: Record<symbol, {
    click?: (event: MouseEvent) => void;
  }> = {};

  registerControl(
    config: Omit<LayoutControlConfig, 'id'>,
    events: {
      click?: (event: MouseEvent) => void;
    }
  ) {
    const id = Symbol();
    this._controls.update(curr => [
      ...curr,
      {
        id,
        ...config,
      }
    ])
    this.eventsMap[id] = events;
    return {
      update: (config: Omit<LayoutControlConfig, 'id'>) => {
        this._controls.update(curr => curr.map(c => c.id == id ? {...c, ...config} : c))
      },
      dispose: () => {
        this._controls.update(curr => curr.filter(c => c.id != id))
      }
    }
  }

  controlOnClick(id: symbol, event: MouseEvent) {
    this.eventsMap[id]?.click?.(event)
  }
}
