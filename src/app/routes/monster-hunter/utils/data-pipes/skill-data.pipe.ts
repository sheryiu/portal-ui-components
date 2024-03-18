import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Skill } from '../../../../data/skill';
import { SkillService } from '../../../../store/skill.service';

@Pipe({
  name: 'skillData',
  standalone: true
})
export class SkillDataPipe implements PipeTransform {
  private service = inject(SkillService);
  transform(value: string | null | undefined): Observable<Skill | undefined> {
    if (value == null) return of(undefined);
    return from(this.service.getOne(value));
  }

}
