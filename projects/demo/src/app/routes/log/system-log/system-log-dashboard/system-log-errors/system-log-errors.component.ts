import { Component, computed, input } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { TableModule, TimeDisplayComponent } from 'portal-ui-ng/components';
import { SystemLog } from '../../../../../data/log.types';

@Component({
  selector: 'demo-system-log-errors',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    TimeDisplayComponent,
  ],
  templateUrl: './system-log-errors.component.html',
  styles: ``
})
export class SystemLogErrorsComponent {
  errors = input.required<SystemLog[]>()
  protected processed = computed(() => this.errors().toSorted((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 20))

  type!: SystemLog
}
