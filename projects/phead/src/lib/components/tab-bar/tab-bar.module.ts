import { NgModule } from '@angular/core';
import { TabBarContainerDirective } from './tab-bar-container.directive';
import { TabBarHeaderSupplementaryDirective } from './tab-bar-header/tab-bar-header-supplementary.directive';
import { TabBarHeaderComponent } from './tab-bar-header/tab-bar-header.component';
import { TabBarComponent } from './tab-bar.component';

@NgModule({
  declarations: [],
  imports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerDirective,
    TabBarHeaderSupplementaryDirective,
  ],
  exports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerDirective,
    TabBarHeaderSupplementaryDirective,
  ]
})
export class TabBarModule { }
