import { sha1 } from 'object-hash';

export function memoize(target: Object, propertyName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  const memoizeMap = new Map<string, any>();
  descriptor.value = function(...args: any[]) {
    const key = sha1(args);
    if (memoizeMap.has(key)) return memoizeMap.get(key);
    const result = original.apply(this, args);
    memoizeMap.set(key, result);
    return result;
  }
}