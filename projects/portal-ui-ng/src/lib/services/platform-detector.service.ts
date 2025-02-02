import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

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
        this.platform.SAFARI
          ? 'mac'
          : this.platform.ANDROID
          ? 'android'
          : this.platform.IOS
          ? 'ios'
          : 'other'
    }
  }
}
