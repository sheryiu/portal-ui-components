import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, DividerComponent, FieldModule, SegmentedOptionsModule, SidebarModule } from 'phead';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { SkillEffect, SkillLevel } from '../../../../../data/skill';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillLevelCreateInput, SkillService } from '../../../../../store/skill.service';

@Component({
  selector: 'mhw-drawer-level-create',
  standalone: true,
  imports: [
    SharedModule,
    AccordionModule,
    FieldModule,
    SidebarModule,
    DividerComponent,
    SegmentedOptionsModule,
  ],
  templateUrl: './drawer-level-create.component.html',
  styles: ``
})
export class DrawerLevelCreateComponent extends EffectFn {
  @Input({ required: true }) id: string | null | undefined;
  private service = inject(SkillService);
  private builder = inject(FormBuilder);
  formControl = this.builder.nonNullable.control<SkillLevelCreateInput | null>(null);
  effectType = this.builder.nonNullable.control<SkillEffect['type'] | null>(null)

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    filter(() => this.id != null && this.formControl.value != null),
    exhaustMap(() =>
      this.service.addLevel(this.id!, this.formControl.value!).pipe(
        catchError(() => EMPTY)
      )
    ),
    tap(() => this.formControl.reset()),
  ))

  addEffect = this.createEffectFn<void>(args$ => args$.pipe(
    tap(() => {
      const value = this.formControl.getRawValue();
      this.formControl.setValue(value ? {
        ...value,
        effects: [...(value.effects ?? []), {
          type: this.effectType.value,
        }]
      } as unknown as SkillLevel : {
        effects: [{
          type: this.effectType.value,
        }]
      } as unknown as SkillLevel)
      this.effectType.reset();
    })
  ))

}
