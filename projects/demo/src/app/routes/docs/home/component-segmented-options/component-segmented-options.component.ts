import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SegmentedOptionsModule } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-segmented-options',
  standalone: true,
  imports: [
    SharedModule,
    SegmentedOptionsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-segmented-options.component.html',
  styles: ``
})
export class ComponentSegmentedOptionsComponent {

}
