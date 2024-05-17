import { Component } from '@angular/core';
import { SegmentedOptionsModule } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-segmented-options',
  standalone: true,
  imports: [
    SharedModule,
    SegmentedOptionsModule,
  ],
  templateUrl: './component-segmented-options.component.html',
  styles: ``
})
export class ComponentSegmentedOptionsComponent {

}
