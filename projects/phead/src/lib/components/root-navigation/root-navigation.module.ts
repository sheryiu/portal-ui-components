import { NgModule } from '@angular/core';
import { QuickAccessComponentDirective } from './quick-access/quick-access-component.directive';
import { RootNavigationComponent } from './root-navigation.component';

@NgModule({
  declarations: [],
  imports: [
    RootNavigationComponent,
    QuickAccessComponentDirective,
  ],
  exports: [
    RootNavigationComponent,
    QuickAccessComponentDirective,
  ]
})
export class RootNavigationModule { }
