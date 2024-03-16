import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Skill } from '../../../../data/skill';
import { SkillService } from '../../../../store/skill.service';

@Pipe({
  name: 'skillData',
  standalone: true
})
export class SkillDataPipe implements PipeTransform {
  private service = inject(SkillService);
  transform(value: string): Observable<Skill | undefined> {
    return from(this.service.getOne(value));
  }

}
