import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverableDirective } from '../../base';
import { TabBarContainerDirective } from './tab-bar-container.directive';
import { TabBarHeaderSupplementaryDirective } from './tab-bar-header/tab-bar-header-supplementary.directive';
import { TabBarHeaderComponent } from './tab-bar-header/tab-bar-header.component';
import { TabBarComponent } from './tab-bar.component';

@NgModule({
  declarations: [
    TabBarComponent,
    TabBarHeaderSupplementaryDirective,
  ],
  imports: [
    NgClass,
    HoverableDirective,
    TabBarHeaderComponent,
    TabBarContainerDirective,
  ],
  exports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerDirective,
    TabBarHeaderSupplementaryDirective,
  ]
})
export class TabBarModule { }
