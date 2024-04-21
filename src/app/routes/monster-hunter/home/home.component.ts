import { Component } from '@angular/core';
import { LibraryModule } from '../../../library/library.module';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'mhw-home',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  tables = [
    { name: 'Armor', route: ['armor'] },
    { name: 'Armor Set', route: ['armor-set'] },
  ]
}
