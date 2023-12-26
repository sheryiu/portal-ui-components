import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonsModule } from '../../../atoms/buttons/buttons.module';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  selector: 'app-edit-toolbar',
  standalone: true,
  imports: [ButtonsModule, NgTemplateOutlet],
  templateUrl: './edit-toolbar.component.html',
  host: {
    class: 'ds-toolbar ds-edit-toolbar',
  }
})
export class EditToolbarComponent extends ToolbarComponent {

}
