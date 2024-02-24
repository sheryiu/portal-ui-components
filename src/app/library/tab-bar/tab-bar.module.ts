import { NgModule } from '@angular/core';
import { TabBarContainerElementDirective } from './tab-bar-container-element.directive';
import { TabBarHeaderComponent } from './tab-bar-header/tab-bar-header.component';
import { TabBarComponent } from './tab-bar.component';

@NgModule({
  declarations: [],
  imports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerElementDirective,
  ],
  exports: [
    TabBarComponent,
    TabBarHeaderComponent,
    TabBarContainerElementDirective,
  ]
})
export class TabBarModule { }
