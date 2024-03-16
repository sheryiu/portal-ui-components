import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../../../../data/skill';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillDataPipe } from '../../../utils/data-pipes/skill-data.pipe';

@Component({
  selector: 'app-armor-set-bonus-edit-effect',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    SkillDataPipe,
  ],
  templateUrl: './armor-set-bonus-edit-effect.component.html',
  styles: ``
})
export class ArmorSetBonusEditEffectComponent implements OnInit {
  private parentContainer = inject(ControlContainer);
  formGroup!: FormGroup;
  @Output() removeEffect = new EventEmitter<void>();

  ngOnInit(): void {
    this.formGroup = this.parentContainer.control! as FormGroup;
  }

  pickSkill(item: Skill) {
    return item.id;
  }
}