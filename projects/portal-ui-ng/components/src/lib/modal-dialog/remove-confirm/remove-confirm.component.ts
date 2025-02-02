import { Component, OnDestroy, input } from '@angular/core';
import { InputFieldComponent } from 'portal-ui-ng/base';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'pui-remove-confirm',
  imports: [
    InputFieldComponent,
  ],
  templateUrl: './remove-confirm.component.html'
})
export class RemoveConfirmComponent implements OnDestroy {
  readonly stringToCheck = input.required<string>();

  matches$ = new ReplaySubject<boolean>(1);

  onInput(event: Event) {
    const text = event.currentTarget as HTMLInputElement;
    this.matches$.next(this.stringToCheck() === text.value);
  }

  ngOnDestroy(): void {
    this.matches$.complete();
  }
}
