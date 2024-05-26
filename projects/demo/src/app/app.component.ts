import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootNavigationModule } from 'portal-ui-ng';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, RootNavigationModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'demo';
}
