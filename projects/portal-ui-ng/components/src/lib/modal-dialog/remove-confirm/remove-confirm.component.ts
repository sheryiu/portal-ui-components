import { Component, input, output } from '@angular/core';
import { InputFieldComponent } from 'portal-ui-ng/base';

@Component({
  selector: 'pui-remove-confirm',
  imports: [
    InputFieldComponent,
  ],
  templateUrl: './remove-confirm.component.html'
})
export class RemoveConfirmComponent {
  readonly stringToCheck = input.required<string>();
  matchChanged = output<boolean>();

  onInput(event: Event) {
    const text = event.currentTarget as HTMLInputElement;
    this.matchChanged.emit(this.stringToCheck() === text.value);
  }
}
