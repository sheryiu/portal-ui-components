import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
  standalone: true
})
export class ArrayPipe implements PipeTransform {

  transform(value: number | null | undefined) {
    return Array(value ?? 0).fill(0).map((_, i) => i)
  }

}
