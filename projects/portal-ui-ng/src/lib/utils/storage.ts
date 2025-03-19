import { isPlatformServer } from '@angular/common';
import { InjectionToken, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';

export const STORAGE = new InjectionToken<{
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
} | null | undefined>('web storage api')

export const provideLocalStorage = () => makeEnvironmentProviders([
  {
    provide: STORAGE,
    deps: [PLATFORM_ID],
    useFactory: (platformId: any) => {
      if (isPlatformServer(platformId)) return null;
      return window.localStorage;
    }
  }
])