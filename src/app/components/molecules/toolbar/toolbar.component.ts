import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, QueryList } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonsModule } from '../../atoms/buttons/buttons.module';
import { ToolbarItem } from './toolbar-item';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ButtonsModule, RouterLink, NgTemplateOutlet],
  templateUrl: './toolbar.component.html',
  host: {
    class: 'ds-toolbar'
  }
})
export class ToolbarComponent {

  @ContentChildren(ToolbarItem) items?: QueryList<ToolbarItem>;

}
