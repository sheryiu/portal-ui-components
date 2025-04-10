import { booleanAttribute, DestroyRef, Directive, effect, inject, input, output, TemplateRef } from '@angular/core';
import { LayoutControlConfig, LayoutControlMode, LayoutService } from './layout.service';

@Directive({
  selector: 'pui-layout-control',
  standalone: true
})
export class LayoutControlDirective {
  private layoutService = inject(LayoutService, { optional: true });
  private destroyRef = inject(DestroyRef)

  id = input.required<string>();
  label = input.required<string>();
  /** @description the larger the weight, the more important the button is */
  weight = input<number | undefined>(0);
  icon = input<string>();
  iconTemplateRef = input<TemplateRef<unknown>>();
  disabled = input(false, { transform: booleanAttribute })
  mode = input<LayoutControlMode | undefined>(undefined)
  click = output<MouseEvent>();

  constructor() {
    if (!this.layoutService) return;
    let updateFn: (config: LayoutControlConfig) => void;
    let disposeFn: () => void;
    effect(() => {
      const id = this.id();
      const label = this.label();
      const isDisabled = this.disabled();
      const icon = this.icon();
      const iconTemplateRef = this.iconTemplateRef();
      const mode = this.mode();
      const weight = this.weight();
      const config = {
        id,
        label,
        isDisabled,
        icon,
        iconTemplateRef,
        weight,
        mode,
      }
      if (!updateFn) {
        const register = this.layoutService!.registerControl(config, {
          click: (e) => this.click.emit(e)
        });
        updateFn = register.update;
        disposeFn = register.dispose;
      } else {
        updateFn(config)
      }
    })
    this.destroyRef.onDestroy(() => {
      disposeFn?.();
    })
  }

}
