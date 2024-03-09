import { Component, OnInit, inject } from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'core-skill-effect-edit',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './skill-effect-edit.component.html',
  styles: ``
})
export class SkillEffectEditComponent implements OnInit {
  private parentContainer = inject(ControlContainer);
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.parentContainer.control! as FormGroup;
  }
}
