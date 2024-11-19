import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { LanguageToggleComponent, ThemeToggleComponent, provideGlobalSearch, provideQuickAccess, provideRootNavigation, provideTheme, themeGlobalSearch, withLogo, withProvider, withProviderFn, withUser, withWidget } from 'portal-ui-ng';
import { routes } from './app.routes';
import { DatabaseInfoQuickAccessComponent } from './core/database-info-quick-access/database-info-quick-access.component';
import { LogoComponent } from './core/logo/logo.component';
import { SettingsQuickAccessComponent } from './core/settings-quick-access/settings-quick-access.component';
import { TranslocoHttpLoader } from './core/transloco-http-loader';
import { UserComponent } from './core/user/user.component';
import { ArmorSetBonusService } from './store/armor-set-bonus.service';
import { ArmorSetService } from './store/armor-set.service';
import { ArmorService } from './store/armor.service';
import { SkillService } from './store/skill.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme(),
    provideHttpClient(withFetch()),
    // TODO toggle animation
    // don't use provideAnimationsAsync, will cause dialog animation to act strange as it first loads the module
    // provideAnimationsAsync(),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideClientHydration(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'jp'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideQuickAccess(
      withWidget(SettingsQuickAccessComponent),
      withWidget(DatabaseInfoQuickAccessComponent),
      withWidget(ThemeToggleComponent),
      withWidget(LanguageToggleComponent),
    ),
    provideRootNavigation(
      [
        {
          icon: 'sports_esports',
          label: 'MHW',
          routerLink: ['mhw'],
        },
        {
          icon: 'checklist',
          label: 'TO-DO',
          routerLink: ['todo']
        },
        {
          icon: 'code',
          label: 'Docs',
          routerLink: ['docs'],
        },
      ],
      withLogo(LogoComponent),
      withUser(UserComponent),
    ),
    provideGlobalSearch(
      undefined,
      withProvider(ArmorService),
      withProvider(ArmorSetService),
      withProvider(ArmorSetBonusService),
      withProvider(SkillService),
      withProviderFn(themeGlobalSearch),
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ]
};
