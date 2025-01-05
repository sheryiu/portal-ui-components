import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';

@Pipe({
  name: 'lodashGet',
  standalone: true
})
export class LodashGetPipe implements PipeTransform {

  transform(value: any, path: string | string[], defaultValue?: any) {
    return get(value, path, defaultValue)
  }

}
