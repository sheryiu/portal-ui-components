import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

export type ScreenWidthDetectorOptions = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

export const SCREEN_WIDTH_DETECTOR_OPTIONS = new InjectionToken<ScreenWidthDetectorOptions>('')

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthDetectorService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private document = inject(DOCUMENT)
  private options = inject(SCREEN_WIDTH_DETECTOR_OPTIONS, { optional: true })

  constructor() { }

  /**
   * returns true when screen width is more than or equal to a size
   */
  above() {
    return {
      sm: () => this.isBrowser ? this.document.documentElement.clientWidth >= (this.options?.sm ?? 640) : false,
      md: () => this.isBrowser ? this.document.documentElement.clientWidth >= (this.options?.md ?? 768) : false,
      lg: () => this.isBrowser ? this.document.documentElement.clientWidth >= (this.options?.lg ?? 1024) : false,
      xl: () => this.isBrowser ? this.document.documentElement.clientWidth >= (this.options?.xl ?? 1280) : false,
      '2xl': () => this.isBrowser ? this.document.documentElement.clientWidth >= (this.options?.['2xl'] ?? 1536) : false,
    }
  }

  /**
   * returns true when screen width is less than or equal to a size
   */
  below() {
    return {
      sm: () => this.isBrowser ? this.document.documentElement.clientWidth <= (this.options?.sm ?? 640) : false,
      md: () => this.isBrowser ? this.document.documentElement.clientWidth <= (this.options?.md ?? 768) : false,
      lg: () => this.isBrowser ? this.document.documentElement.clientWidth <= (this.options?.lg ?? 1024) : false,
      xl: () => this.isBrowser ? this.document.documentElement.clientWidth <= (this.options?.xl ?? 1280) : false,
      '2xl': () => this.isBrowser ? this.document.documentElement.clientWidth <= (this.options?.['2xl'] ?? 1536) : false,
    }
  }
}
