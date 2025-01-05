import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TabBarComponent } from './tab-bar.component';
import { TabDirective } from './tab.directive';

@NgModule({
  declarations: [
    TabBarComponent,
    TabDirective,
  ],
  imports: [
    NgTemplateOutlet,
    NgClass,
    HoverableDirective,
  ],
  exports: [
    TabBarComponent,
    TabDirective,
  ]
})
export class TabBarModule { }
