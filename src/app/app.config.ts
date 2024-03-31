import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, inject, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { map } from 'rxjs';
import { routes } from './app.routes';
import { ThemeService, provideTheme } from './components/services/theme.service';
import { TranslocoHttpLoader } from './core/transloco-http-loader';
import { provideGlobalSearch, withAction, withSuggestions } from './library/global-search/global-search';
import { provideMultilingual } from './library/multilingual-text-edit/multilingual-text-edit.component';
import { provideRootNavigation } from './library/root-navigation/root-navigation';
import { DatabaseQuickSettingsComponent } from './library/root-navigation/user-dialog/database-quick-settings/database-quick-settings.component';
import { LanguageToggleComponent } from './library/root-navigation/user-dialog/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from './library/root-navigation/user-dialog/theme-toggle/theme-toggle.component';
import { provideUserDialog, withQuickSettingsComponent } from './library/root-navigation/user-dialog/user-dialog.component';
import { ArmorSetBonusService } from './store/armor-set-bonus.service';
import { ArmorSetService } from './store/armor-set.service';
import { ArmorService } from './store/armor.service';
import { SkillService } from './store/skill.service';

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
      })
    ),
    provideClientHydration(),
    provideMultilingual(['jp', 'en']),
    provideTransloco({
      config: {
        availableLangs: ['en', 'jp'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideRootNavigation([
      {
        icon: 'sports_esports',
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
        icon: 'brush',
        label: 'Design',
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
    ),
    provideGlobalSearch(
      withSuggestions(() => {
        const service = inject(ArmorService);
        return service.list().pipe(
          map(list => list?.map(d => ({
            title: [d.name?.jp, d.name?.en].filter(s => s != null).join(' / '),
            icon: 'apparel',
            routerLink: ['mhw', 'armor', d.id],
          })))
        )
      }),
      withSuggestions(() => {
        const service = inject(ArmorSetService);
        return service.list().pipe(
          map(list => list?.map(d => ({
            title: [d.name?.jp, d.name?.en].filter(s => s != null).join(' / '),
            routerLink: ['mhw', 'armor-set', d.id],
          })))
        )
      }),
      withSuggestions(() => {
        const service = inject(SkillService);
        return service.list().pipe(
          map(list => list?.map(d => ({
            title: [d.name?.jp, d.name?.en].filter(s => s != null).join(' / '),
            description: 'Skill',
            routerLink: ['mhw', 'skill', d.id],
          })))
        )
      }),
      withSuggestions(() => {
        const service = inject(ArmorSetBonusService);
        return service.list().pipe(
          map(list => list?.map(d => ({
            title: [d.name?.jp, d.name?.en].filter(s => s != null).join(' / '),
            description: 'Armor Set Bonus',
            routerLink: ['mhw', 'armor-set-bonus', d.id],
          })))
        )
      }),
      withAction(
        'Light Mode',
        () => {
          const service = inject(ThemeService);
          service.setTheme('light');
        },
        {
          icon: 'light_mode',
        }
      ),
      withAction(
        'Dark Mode',
        () => {
          const service = inject(ThemeService);
          service.setTheme('dark');
        },
        {
          icon: 'dark_mode',
        }
      ),
      withAction(
        'System Theme',
        () => {
          const service = inject(ThemeService);
          service.setTheme('system');
        },
        {
          icon: 'phone_iphone',
          description: 'Follow device default theme'
        }
      ),
    )
  ],
};
