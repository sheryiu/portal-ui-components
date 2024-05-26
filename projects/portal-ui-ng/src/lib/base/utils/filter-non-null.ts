import { OperatorFunction, filter } from 'rxjs';

export function filterNonNull<T>(): OperatorFunction<T | null | undefined, T> {
  return args$ => args$.pipe(
    filter(isNonNull)
  )
}

export function isNonNull<T>(v: T | null | undefined): v is T {
  return v != null
}