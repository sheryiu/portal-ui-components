import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco } from '@ngneat/transloco';
import { provideTheme } from 'portal-ui-ng';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/transloco-http-loader';

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
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
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
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ]
};
