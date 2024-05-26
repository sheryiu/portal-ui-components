import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EffectFn } from '@ngneat/effects-ng';
import { tap, throttleTime } from 'rxjs';
import { ThemeService } from '../../../../base';
import { QuickAccessComponentDirective } from '../quick-access-component.directive';

@Component({
  selector: 'pui-theme-toggle',
  standalone: true,
  imports: [
    QuickAccessComponentDirective,
    NgClass,
  ],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent extends EffectFn {
  private service = inject(ThemeService);
  userPreference$$ = toSignal(this.service.userPreference$);

  onChangeTheme = this.createEffectFn<void>(args$ => args$.pipe(
    throttleTime(100),
    tap(() => {
      switch (this.userPreference$$()) {
        case 'dark': this.service.setTheme('system'); break;
        case 'light': this.service.setTheme('dark'); break;
        case 'system': this.service.setTheme('light'); break;
      }
    })
  ))
}
