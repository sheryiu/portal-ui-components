import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideLocalStorage, providePlatformDetector, provideTheme } from 'portal-ui-ng';
import { provideVanillaCalendarProCalendarOverlay } from 'portal-ui-ng/components/calendar-overlay/vanilla-calendar-pro';
import { provideHumanizeDurationTimeAgo } from 'portal-ui-ng/components/time-ago/humanize-duration';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme(),
    providePlatformDetector(),
    provideHttpClient(withFetch()),
    // don't use provideAnimationsAsync, will cause dialog animation to act strange as it first loads the module
    // provideAnimationsAsync(),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(isDevMode() ? NoPreloading : PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
      // withViewTransitions(),
    ),
    // provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    provideHumanizeDurationTimeAgo(),
    provideVanillaCalendarProCalendarOverlay(),
    provideLocalStorage(),
  ]
};
