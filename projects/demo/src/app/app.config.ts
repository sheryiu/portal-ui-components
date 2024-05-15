import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { LanguageToggleComponent, ThemeToggleComponent, provideGlobalSearch, provideModalDialog, providePheadOverlay, provideRootNavigation, provideTheme, themeGlobalSearch, withLogo, withProvider, withProviderFn, withQuickAccessComponent } from 'phead';
import { routes } from './app.routes';
import { DatabaseInfoQuickAccessComponent } from './core/database-info-quick-access/database-info-quick-access.component';
import { LogoComponent } from './core/logo/logo.component';
import { SettingsQuickAccessComponent } from './core/settings-quick-access/settings-quick-access.component';
import { TranslocoHttpLoader } from './core/transloco-http-loader';
import { ArmorService } from './store/armor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme(),
    provideHttpClient(withFetch()),
    // TODO toggle animation
    // provideAnimations(),
    provideNoopAnimations(),
    provideRouter(
      routes,
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
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
    providePheadOverlay(),
    provideModalDialog(),
    provideRootNavigation(
      [
        {
          icon: 'sports_esports',
          label: 'MHW',
          routerLink: ['mhw'],
        },
        {
          icon: 'brush',
          label: 'Design',
          routerLink: ['skills'],
        },
      ],
      withLogo(LogoComponent),
      withQuickAccessComponent(SettingsQuickAccessComponent),
      withQuickAccessComponent(DatabaseInfoQuickAccessComponent),
      withQuickAccessComponent(ThemeToggleComponent),
      withQuickAccessComponent(LanguageToggleComponent),
    ),
    provideGlobalSearch(
      undefined,
      withProvider(ArmorService),
      withProviderFn(themeGlobalSearch),
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ]
};
