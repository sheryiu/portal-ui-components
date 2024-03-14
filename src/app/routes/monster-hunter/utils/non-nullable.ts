import { OperatorFunction, filter } from 'rxjs';

function filterFn<T>(d: T | null | undefined): d is T {
  return d != null;
}

export function nonNullable<T>(): OperatorFunction<T | null | undefined, T> {
  return args$ => args$.pipe(
    filter(filterFn)
  )
}