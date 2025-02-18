import { distinctUntilChanged, map, MonoTypeOperatorFunction, of, switchMap, timer } from 'rxjs';

/**
 * Delay emission of loading status boolean when value is false
 * Immediately emit when value is true
 * @param dueTime milliseconds
 * @returns
 */
export function loadingDebounce(dueTime: number = 800): MonoTypeOperatorFunction<boolean> {
  return args$ => args$.pipe(
    distinctUntilChanged(),
    switchMap(isLoading => isLoading
      ? of(isLoading)
      : timer(dueTime).pipe(map(() => isLoading))
    )
  )
}