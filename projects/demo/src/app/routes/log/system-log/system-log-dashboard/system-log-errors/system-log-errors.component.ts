import { Component, computed, inject, input } from '@angular/core';
import { ScreenWidthDetectorService } from 'portal-ui-ng';
import { ButtonModule, HoverableDirective } from 'portal-ui-ng/base';
import { TableModule, TimeDisplayComponent } from 'portal-ui-ng/components';
import { SystemLog } from '../../../../../data/log.types';

@Component({
  selector: 'demo-system-log-errors',
  imports: [
    ButtonModule,
    TableModule,
    TimeDisplayComponent,
    HoverableDirective
  ],
  templateUrl: './system-log-errors.component.html',
})
export class SystemLogErrorsComponent {
  private screenWidth = inject(ScreenWidthDetectorService)
  errors = input.required<SystemLog[]>()
  protected processed = computed(() => {
    const array = this.errors().toSorted((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 20);
    return array.map(log => ({
      ...log,
      __route: this.screenWidth.above().sm()
        ? ['../../', 'system-log', { outlets: { peek: [log.id] } }]
        : ['../', 'detail', log.id]
    }))
  })

  type!: SystemLog;
}
