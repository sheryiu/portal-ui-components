import { NgModule } from '@angular/core';
import { GlobalSearchButtonComponent } from './global-search-button/global-search-button.component';
import { GlobalSearchComponent } from './global-search-overlay/global-search-overlay.component';

@NgModule({
  declarations: [],
  imports: [
    GlobalSearchComponent,
    GlobalSearchButtonComponent,
  ],
  exports: [
    GlobalSearchComponent,
    GlobalSearchButtonComponent,
  ]
})
export class GlobalSearchModule { }
