import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryModule } from './library/library.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, LibraryModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'design-system-alpha';

  constructor() {}
}
