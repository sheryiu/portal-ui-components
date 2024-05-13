import { A11yModule } from '@angular/cdk/a11y';
import { Component, forwardRef, inject, output, signal } from '@angular/core';
import { InputFieldComponent, PheadOverlayRef } from '../../../../base';
import { DividerComponent } from '../../../divider';
import { DropdownOverlay } from '../dropdown-overlay/dropdown-overlay.component';

@Component({
  selector: 'phead-search-dropdown',
  standalone: true,
  imports: [
    InputFieldComponent,
    A11yModule,
    DividerComponent,
  ],
  templateUrl: './search-dropdown.component.html',
  styles: ``,
  providers: [
    {
      provide: DropdownOverlay,
      useExisting: forwardRef(() => SearchDropdownComponent),
    }
  ]
})
export class SearchDropdownComponent extends DropdownOverlay {
  searchTerm$$ = signal<string>('');
  searchUpdate = output<string>();
  private overlayRef = inject(PheadOverlayRef);

  onInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    this.searchTerm$$.set(target.value.trim());
    this.searchUpdate.emit(this.searchTerm$$());
  }

  override selectValue(value: unknown): void {
    this.dropdown.value$$.set(value);
    this.overlayRef.close();
  }
}
