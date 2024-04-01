import { Pipe, PipeTransform } from '@angular/core';
import { FuseResult } from 'fuse.js';

@Pipe({
  name: 'fuseHighlight',
  standalone: true
})
export class FuseHighlightPipe implements PipeTransform {

  transform(fuseResult: FuseResult<Record<string, any>>, key: string): any {
    if (fuseResult.matches?.some(m => m.key === key)) {
      const v = fuseResult.item[key];
      const match = fuseResult.matches.find(m => m.key === key)!;
      if (typeof v === 'string') {
        const splitted = v.split('');
        match.indices.map((index, i) => {
          splitted.splice(index[0] + i * 2, 0, '<b class="text-primary-600 dark:text-primary-500">')
          splitted.splice(index[1] + 2 + i * 2, 0, '</b>')
        })
        return splitted.join('');
      } else {
        return v;
      }
    }
    return fuseResult.item[key];
  }

}
