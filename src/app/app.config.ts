import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { routes } from './app.routes';
import { provideTheme } from './components/services/theme.service';
import { TranslocoHttpLoader } from './core/transloco-http-loader';
import { provideMultilingual } from './library/multilingual-text-edit/multilingual-text-edit.component';
import { provideRootNavigation } from './library/root-navigation/root-navigation';
import { DatabaseQuickSettingsComponent } from './library/root-navigation/user-dialog/database-quick-settings/database-quick-settings.component';
import { LanguageToggleComponent } from './library/root-navigation/user-dialog/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './library/root-navigation/user-dialog/theme-toggle/theme-toggle.component';
import { provideUserDialog, withQuickSettingsComponent } from './library/root-navigation/user-dialog/user-dialog.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideClientHydration(),
    provideMultilingual(['jp', 'en', 'zh']),
    provideTransloco({
      config: {
        availableLangs: ['en', 'jp', 'zh'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideRootNavigation([
      {
        icon: 'apparel',
        label: 'MHW',
        routerLink: ['mhw'],
        children: [
          {
            type: 'route',
            icon: 'calculate',
            label: 'Armor Simulator',
            routerLink: ['mhw', 'armor-sim'],
          },
          {
            type: 'header',
            label: 'Database'
          },
          {
            type: 'route',
            label: 'Armor Pieces',
            routerLink: ['mhw', 'armor'],
            icon: 'apparel'
          },
          {
            type: 'route',
            label: 'Armor Sets',
            routerLink: ['mhw', 'armor-set'],
          },
          {
            type: 'route',
            label: 'Charms',
            routerLink: ['mhw', 'charms'],
          },
          {
            type: 'divider',
          },
          {
            type: 'route',
            label: 'Monsters',
            routerLink: ['mhw', 'monster'],
          },
          {
            type: 'route',
            label: 'Materials',
            routerLink: ['mhw', 'material'],
          },
          {
            type: 'route',
            label: 'Skills',
            routerLink: ['mhw', 'skill'],
          },
          {
            type: 'route',
            label: 'Armor Set Bonus',
            routerLink: ['mhw', 'armor-set-bonus'],
          },
        ],
      },
      {
        icon: 'user_attributes',
        label: 'Others',
        routerLink: ['skills'],
      },
    ]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideUserDialog(
      withQuickSettingsComponent(ThemeToggleComponent),
      withQuickSettingsComponent(LanguageToggleComponent),
      withQuickSettingsComponent(DatabaseQuickSettingsComponent),
    )
  ],
};
