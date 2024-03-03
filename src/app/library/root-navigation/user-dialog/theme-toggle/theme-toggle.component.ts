import { Component, inject } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { tap, throttleTime, withLatestFrom } from 'rxjs';
import { ThemeService } from '../../../../components/services/theme.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'core-theme-toggle',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent extends EffectFn {
  private service = inject(ThemeService);
  userPreference$ = this.service.userPreference$;

  onChangeTheme = this.createEffectFn<void>(args$ => args$.pipe(
    throttleTime(100),
    withLatestFrom(this.userPreference$),
    tap(([, pref]) => {
      switch (pref) {
        case 'dark': this.service.setTheme('system'); break;
        case 'light': this.service.setTheme('dark'); break;
        case 'system': this.service.setTheme('light'); break;
      }
    })
  ))
}
