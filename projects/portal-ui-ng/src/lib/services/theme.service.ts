import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, InjectionToken, PLATFORM_ID, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, defer, filter, fromEvent, iif, map, merge, of, shareReplay, startWith, switchMap, tap } from 'rxjs';

export type ThemeOptions = {
  localStorageKey: string;
}

export const THEME_OPTIONS = new InjectionToken<ThemeOptions>('theme service options');

export function provideTheme(options: ThemeOptions = {
  localStorageKey: 'user-preference-theme'
}) {
  return makeEnvironmentProviders([
    ThemeService,
    {
      provide: THEME_OPTIONS,
      useValue: options,
    },
    provideAppInitializer(() => {
      inject(ThemeService)
    })
  ])
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private options = inject(THEME_OPTIONS);
  private localUserPreferenceChange$ = new Subject<'dark' | 'light' | 'system'>();
  currentTheme$;
  userPreference$;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const window = this.document.defaultView;
      if (window) {
        this.userPreference$ = merge(
          this.localUserPreferenceChange$,
          fromEvent<StorageEvent>(window, 'storage').pipe(
            filter(event => event.key === this.options.localStorageKey),
            startWith({}),
            map(() => format(window.localStorage.getItem(this.options.localStorageKey))),
          ),
        ).pipe(
          shareReplay(1),
        )
        const systemIsDark$ = fromEvent<MediaQueryListEvent>(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
          .pipe(
            startWith(window.matchMedia('(prefers-color-scheme: dark)')),
            map(e => e.matches ? 'dark' as const : 'light' as const),
            takeUntilDestroyed(),
          );
        this.currentTheme$ = this.userPreference$.pipe(
          switchMap(userPreference => iif(
            () => userPreference === 'system',
            defer(() => systemIsDark$),
            of(userPreference as 'dark' | 'light'),
          )),
          shareReplay(1),
        )
      } else {
        this.currentTheme$ = of('dark' as const);
        this.userPreference$ = of('dark' as const);
      }
    } else {
      this.currentTheme$ = of('dark' as const);
      this.userPreference$ = of('dark' as const);
    }
    this.currentTheme$.pipe(
      tap(theme => {
        const document = this.document?.documentElement;
        theme === 'dark' ? document.classList.add('dark') : document.classList.remove('dark');
      }),
      takeUntilDestroyed(),
    ).subscribe()
  }

  setTheme(newTheme: 'dark' | 'light' | 'system') {
    if (isPlatformBrowser(this.platformId)) {
      const window = this.document.defaultView;
      if (newTheme === 'system') {
        window?.localStorage.removeItem(this.options.localStorageKey);
      } else {
        window?.localStorage.setItem(this.options.localStorageKey, newTheme);
      }
      this.localUserPreferenceChange$.next(newTheme);
    }
  }
}

function format(value: string | null | undefined): 'dark' | 'light' | 'system' {
  return (value == null) ? 'system' : value == 'dark' ? 'dark' : 'light';
}