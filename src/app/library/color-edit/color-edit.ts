import { InjectionToken, Provider } from '@angular/core';

export type ColorEditOptions = {
  presets?: string[];
}

export const COLOR_EDIT_OPTIONS = new InjectionToken<ColorEditOptions>('color edit component options');

export function provideColorEditOptions(options: ColorEditOptions): Provider[] {
  return [
    {
      provide: COLOR_EDIT_OPTIONS,
      useValue: options,
    }
  ]
}