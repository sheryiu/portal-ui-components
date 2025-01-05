import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInSet',
  standalone: true
})
export class IsInSetPipe<T> implements PipeTransform {

  transform(item: T, set: Set<T>, cmpFn?: (a: T, b: T) => boolean) {
    if (cmpFn) {
      let iter = set.values();
      let v = iter.next();
      while (!v.done) {
        if (cmpFn(v.value, item)) return true;
        v = iter.next();
      }
      return false;
    }
    return set.has(item);
  }

}
