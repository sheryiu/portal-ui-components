import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ArmorSetBonus } from '../../../../data/armor-set-bonus';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';

@Pipe({
  name: 'armorSetBonusData',
  standalone: true
})
export class ArmorSetBonusDataPipe implements PipeTransform {
  private service = inject(ArmorSetBonusService);
  transform(value: string): Observable<ArmorSetBonus | undefined> {
    return from(this.service.getOne(value));
  }

}
