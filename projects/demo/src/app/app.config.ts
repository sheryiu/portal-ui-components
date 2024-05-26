import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { LanguageToggleComponent, ThemeToggleComponent, provideGlobalSearch, provideModalDialog, provideQuickAccess, provideRootNavigation, provideTheme, providepuiOverlay, themeGlobalSearch, withLogo, withProvider, withProviderFn, withWidget } from 'portal-ui-ng';
import { routes } from './app.routes';
import { DatabaseInfoQuickAccessComponent } from './core/database-info-quick-access/database-info-quick-access.component';
import { LogoComponent } from './core/logo/logo.component';
import { SettingsQuickAccessComponent } from './core/settings-quick-access/settings-quick-access.component';
import { TranslocoHttpLoader } from './core/transloco-http-loader';
import { ArmorSetBonusService } from './store/armor-set-bonus.service';
import { ArmorSetService } from './store/armor-set.service';
import { ArmorService } from './store/armor.service';
import { SkillService } from './store/skill.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme(),
    provideHttpClient(withFetch()),
    // TODO toggle animation
    provideAnimations(),
    // provideNoopAnimations(),
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
    providepuiOverlay(),
    provideModalDialog(),
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
