import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, LOCALE_ID, NgZone, PLATFORM_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import humanizeDuration from 'humanize-duration';
import { timer } from 'rxjs';

const SUPPORTED = humanizeDuration.getSupportedLanguages().map(s => s.toLowerCase());

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private localeId = inject(LOCALE_ID);
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private value?: string;

  transform(value: Date): string {
    if (this.value) return this.value;
    let locale: string;
    if (SUPPORTED.includes(this.localeId)) {
      locale = this.localeId;
    } else {
      const countryCode = this.localeId.split('-').at(0)!;
      if (SUPPORTED.includes(countryCode)) {
        locale = countryCode;
      } else {
        locale = 'en';
      }
    }
    const diff = Date.now() - value.getTime();
    if (this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        timer(getTimeout(diff)).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => {
          this.zone.run(() => {
            this.value = undefined;
          })
        })
      })
    }
    this.value = humanizeDuration(diff, {
      language: locale,
      largest: 1,
      round: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm']
    })
    return this.value;
  }

}

function getTimeout(diff: number) {
  if (diff < 60_000) return 0.5 * 60_000;
  if (diff < 60 * 60_000) return 0.5 * 1 * 60_000;
  if (diff < 24 * 60 * 60_000) return 0.5 * 60 * 60_000;
  if (diff < 7 * 24 * 60 * 60_000) return 0.5 * 24 * 60 * 60_000;
  if (diff < 30 * 24 * 60 * 60_000) return 0.5 * 7 * 24 * 60 * 60_000;
  return 30 * 24 * 60 * 60_000;
}