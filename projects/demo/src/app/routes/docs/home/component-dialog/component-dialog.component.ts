import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-dialog',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-dialog.component.html',
  styles: ``
})
export class ComponentDialogComponent {

}
