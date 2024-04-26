import { NgModule } from '@angular/core';
import { AutocompleteOverlayComponent } from './autocomplete-overlay/autocomplete-overlay.component';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';

@NgModule({
  declarations: [],
  imports: [
    AutocompleteTriggerDirective,
    AutocompleteOverlayComponent,
  ],
  exports: [
    AutocompleteTriggerDirective,
    AutocompleteOverlayComponent,
  ]
})
export class AutocompleteModule { }
