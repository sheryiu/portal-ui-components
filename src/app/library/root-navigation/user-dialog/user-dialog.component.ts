import { isPlatformBrowser } from '@angular/common';
import { Component, InjectionToken, PLATFORM_ID, Provider, Type, inject, makeEnvironmentProviders } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

const USER_DIALOG_OPTION = Symbol('user dialog option')

const QUICK_SETTINGS_COMPONENT = new InjectionToken<Type<unknown>[]>('user dialog quick settings component')
export function withQuickSettingsComponent<T>(componentType: Type<T>): {
  readonly [USER_DIALOG_OPTION]: any,
  provider: Provider,
} {
  return {
    [USER_DIALOG_OPTION]: USER_DIALOG_OPTION,
    provider: {
      provide: QUICK_SETTINGS_COMPONENT,
      useValue: componentType,
      multi: true,
    } as Provider
  }
}

export function provideUserDialog(...options: {
  readonly [USER_DIALOG_OPTION]: unique symbol,
  provider: Provider,
}[]) {
  return makeEnvironmentProviders(options.map(o => o.provider));
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    SharedModule,
    ThemeToggleComponent,
  ],
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId)
  quickSettingsComponents = inject(QUICK_SETTINGS_COMPONENT, { optional: true });
}
