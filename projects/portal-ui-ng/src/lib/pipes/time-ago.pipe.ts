import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, DestroyRef, InjectionToken, LOCALE_ID, NgZone, PLATFORM_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {

  private timeAgoFunction = inject(TIME_AGO_FUNCTION, { optional: true }) ?? defaultTimeAgo;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private localeId = inject(LOCALE_ID);
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private value?: string;

  transform(value: Date): string {
    if (this.value) return this.value;
    const diff = Date.now() - value.getTime();
    if (this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        timer(getTimeout(diff)).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => {
          this.zone.run(() => {
            this.value = undefined;
            this.changeDetectorRef.markForCheck();
          })
        })
      })
    }
    this.value = this.timeAgoFunction(value, this.localeId);
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

export const TIME_AGO_FUNCTION = new InjectionToken<(date: Date, localeId: string) => string>('time ago function')

export function defaultTimeAgo(date: Date, localeId: string): string {
  let diff = Date.now() - date.getTime();
  diff -= (diff % 1000);
  diff /= 1000;
  const s = (diff % 60);
  diff -= s;
  diff /= 60;
  if (diff == 0) return `${s}s`;
  const m = (diff % 60);
  diff -= m;
  diff /= 60;
  if (diff == 0) return `${m}m${s}s`;
  const h = (diff % 24);
  diff -= h;
  diff /= 24;
  if (diff == 0) return `${h}h${m}m${s}s`;
  const D = diff;
  return `${D}d${h}h${m}m${s}s`
}