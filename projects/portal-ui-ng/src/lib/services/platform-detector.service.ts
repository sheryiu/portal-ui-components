import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { of } from 'rxjs';

/**
 * Adds a `data-os` attribute to the HTML element
 * `data-os=mac` when browser is Safari
 * `data-os=android` when on Android
 * `data-os=ios` when on iOS
 * `data-os=other` when on other platforms (Windows, Linux, etc)
 */
export function providePlatformDetector() {
  return makeEnvironmentProviders([
    PlatformDetectorService,
    provideAppInitializer(() => {
      inject(PlatformDetectorService);
      return of()
    })
  ])
}

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {
  private platform = inject(Platform)
  private document = inject(DOCUMENT)

  constructor() {
    if (this.platform.isBrowser) {
      this.document.documentElement.dataset['os'] =
        this.platform.SAFARI || navigator.userAgent?.toLowerCase().includes('Mac OS X'.toLowerCase())
          ? 'mac'
          : this.platform.ANDROID
          ? 'android'
          : this.platform.IOS
          ? 'ios'
          : 'other'
    }
  }
}
