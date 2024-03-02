import { NgModule } from '@angular/core';
import { TabBarContainerElementDirective } from './tab-bar-container-element.directive';
import { TabBarHeaderSupplementaryDirective } from './tab-bar-header/tab-bar-header-supplementary.directive';
import { TabBarHeaderComponent } from './tab-bar-header/tab-bar-header.component';
import { TabBarComponent } from './tab-bar.component';

@NgModule({
  declarations: [],
  imports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerElementDirective,
    TabBarHeaderSupplementaryDirective,
  ],
  exports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerElementDirective,
    TabBarHeaderSupplementaryDirective,
  ]
})
export class TabBarModule { }
