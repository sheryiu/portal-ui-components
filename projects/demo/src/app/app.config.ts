import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideLocalStorage, providePlatformDetector, provideTheme } from 'portal-ui-ng';
import { provideDateFnsTimeDisplayFormatter } from 'portal-ui-ng/components';
import { provideVanillaCalendarProCalendarOverlay } from 'portal-ui-ng/components/calendar-overlay/vanilla-calendar-pro';
import { provideHumanizeDurationTimeAgo } from 'portal-ui-ng/components/time-ago/humanize-duration';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideTheme(),
    providePlatformDetector(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    provideHumanizeDurationTimeAgo(),
    provideVanillaCalendarProCalendarOverlay(),
    provideLocalStorage(),
    provideDateFnsTimeDisplayFormatter(),
  ]
};
