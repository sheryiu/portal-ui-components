import { Component, input } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, TimeDisplayComponent, ToggleComponent } from 'portal-ui-ng/components';

@Component({
  selector: 'demo-system-log-export',
  standalone: true,
  imports: [
    ButtonModule,
    TimeDisplayComponent,
    DividerComponent,
    ToggleComponent,
],
  templateUrl: './system-log-export.component.html',
  styles: ``
})
export class SystemLogExportComponent {
  startDate = input.required<Date>()
  endDate = input.required<Date>()

}
