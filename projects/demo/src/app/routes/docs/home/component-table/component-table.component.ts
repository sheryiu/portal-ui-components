import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-table',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-table.component.html',
  styles: ``
})
export class ComponentTableComponent {
  data = [
    { name: 'MSFT', diff: -0.31 },
    { name: 'AAPL', diff: 0.09 },
    { name: 'NVDA', diff: -1.87 },
  ]
}
