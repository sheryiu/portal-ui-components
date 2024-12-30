type KV<T> = { [K in keyof T]: [k: K, v: T[K]] }[keyof T];

/**
 * only generates filter function for 1 layer
 * @param [matchesAll=true] default = true
 * - `= true` When there is filter, all provided matcher functions need to return true, for the predicate to returns true
 * - `= false` When there is filter, only some matcher functions need to return true
 * */
export function computeFilterFunction<T, F>(
  filter: F,
  matcher: {
    [K in keyof F]?: (item: T, k: K, v: F[K], filter: F) => boolean
  },
  matchesAll = true
): ((item: T) => boolean) {
  const hasFilter = Object.values(filter ?? {}).some(v => (typeof v == 'string') ? !!v : (v != null));
  const filterKeys = Object.keys(filter ?? {}) as (keyof F)[];
  return (item) => {
    if (!hasFilter) return true;
    if (matchesAll) {
      for (const key of filterKeys) {
        if (key in matcher && matcher[key] != null) {
          const matched = matcher[key](item, key, filter[key], filter)
          if (!matched) return false;
        }
      }
      return true;
    } else {
      for (const key of filterKeys) {
        if (key in matcher && matcher[key] != null) {
          const matched = matcher[key](item, key, filter[key], filter)
          if (matched) return true;
        }
      }
      return false;
    }
  }
}