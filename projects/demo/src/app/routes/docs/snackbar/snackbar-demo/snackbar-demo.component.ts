import { Component, inject } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { SnackbarDuration, SnackbarService } from 'portal-ui-ng/components';

@Component({
  selector: 'demo-snackbar-demo',
  imports: [
    ButtonModule
  ],
  templateUrl: './snackbar-demo.component.html',
  styles: ``
})
export class SnackbarDemoComponent {
  private snackbar = inject(SnackbarService)

  openSnackbar() {
    this.snackbar.open(
      'Lorem Ipsum',
      {
        duration: SnackbarDuration.LONG
      }
    )
  }

  openSnackbarWithIcon() {
    this.snackbar.open(
      'Lorem Ipsum',
      {
        icon: 'home',
        duration: SnackbarDuration.INFINITE
      }
    )
  }

  openErrorSnackbar() {
    this.snackbar.openError(
      new Error('Unable to authenticate user'),
      {
        duration: SnackbarDuration.INFINITE,
      }
    )
  }
}
