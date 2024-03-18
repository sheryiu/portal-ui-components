import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { ArmorSetService } from '../../../../store/armor-set.service';

@Pipe({
  name: 'armorSetData',
  standalone: true
})
export class ArmorSetDataPipe implements PipeTransform {
  private service = inject(ArmorSetService);
  transform(value: string | null | undefined): Observable<ArmorSet | undefined> {
    if (value == null) return of(undefined);
    return from(this.service.getOne(value));
  }

}
