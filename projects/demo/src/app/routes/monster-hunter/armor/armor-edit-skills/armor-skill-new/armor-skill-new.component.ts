import { Component, EventEmitter, Output } from '@angular/core';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-armor-skill-new',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './armor-skill-new.component.html',
  styles: ``
})
export class ArmorSkillNewComponent {
  @Output() addSkill = new EventEmitter<void>();

}
