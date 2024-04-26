import { A11yModule } from '@angular/cdk/a11y';
import { Component, TemplateRef, inject } from '@angular/core';
import { OVERLAY_DATA } from '../../../components/overlay/overlay';
import { SharedModule } from '../../../shared/shared.module';

export type AutocompleteOverlayData<D> = {
  templateRef: TemplateRef<unknown>;
  data: D[];
  onSelect: (value: D) => void;
}

@Component({
  selector: 'core-autocomplete-overlay',
  standalone: true,
  imports: [
    SharedModule,
    A11yModule,
  ],
  templateUrl: './autocomplete-overlay.component.html',
})
export class AutocompleteOverlayComponent<D> {
  data = inject(OVERLAY_DATA) as AutocompleteOverlayData<D>;

  selectValue(value: D) {
    this.data.onSelect(value);
  }

}
