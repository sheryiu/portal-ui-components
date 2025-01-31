import { NgModule } from '@angular/core';
import { TabBarComponent } from './tab-bar.component';
import { TabDirective } from './tab.directive';

@NgModule({
  imports: [
    TabBarComponent,
    TabDirective,
  ],
  exports: [
    TabBarComponent,
    TabDirective,
  ]
})
export class TabBarModule { }
