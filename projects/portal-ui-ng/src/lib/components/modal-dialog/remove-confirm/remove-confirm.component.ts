import { Component, Input, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { InputFieldComponent } from '../../../base';

@Component({
  selector: 'pui-remove-confirm',
  standalone: true,
  imports: [
    InputFieldComponent,
  ],
  templateUrl: './remove-confirm.component.html',
})
export class RemoveConfirmComponent implements OnDestroy {
  @Input() stringToCheck!: string;

  matches$ = new ReplaySubject<boolean>(1);

  onInput(event: Event) {
    const text = event.currentTarget as HTMLInputElement;
    this.matches$.next(this.stringToCheck === text.value);
  }

  ngOnDestroy(): void {
    this.matches$.complete();
  }
}
