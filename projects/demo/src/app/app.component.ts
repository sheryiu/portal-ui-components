import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DirtyBarComponent, RootNavigationModule } from 'phead';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, RootNavigationModule, DirtyBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'demo';
}
