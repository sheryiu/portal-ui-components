import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { differenceInCalendarDays, endOfDay, startOfDay, sub } from 'date-fns';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, TimeDisplayComponent, TooltipModule } from 'portal-ui-ng/components';
import { SystemLogLevel } from '../../../../data/log.types';
import { SystemLogDataService } from '../../../../data/system-log-data.service';
import { SystemLogCalendarComponent } from './system-log-calendar/system-log-calendar.component';
import { SystemLogChartComponent } from "./system-log-chart/system-log-chart.component";
import { SystemLogErrorsComponent } from "./system-log-errors/system-log-errors.component";
import { SystemLogExportComponent } from "./system-log-export/system-log-export.component";
import { SystemLogSystemsComponent } from "./system-log-systems/system-log-systems.component";

@Component({
  selector: 'demo-system-log-dashboard',
  standalone: true,
  imports: [
    TooltipModule,
    DividerComponent,
    TimeDisplayComponent,
    ButtonModule,
    DecimalPipe,
    SystemLogChartComponent,
    SystemLogErrorsComponent,
    SystemLogCalendarComponent,
    SystemLogExportComponent,
    SystemLogSystemsComponent
],
  templateUrl: './system-log-dashboard.component.html',
  styles: ``
})
export class SystemLogDashboardComponent {
  private dataService = inject(SystemLogDataService)
  private rawData = toSignal(this.dataService.getList())

  startDate = signal<Date>(startOfDay(sub(new Date(), { days: 7 })))
  endDate = signal<Date>(endOfDay(sub(new Date(), { days: 1 })))

  filteredData = computed(() => {
    return this.rawData()?.filter(l => l.timestamp >= this.startDate() && l.timestamp <= this.endDate())
  })
  errors = computed(() => {
    return this.filteredData()?.filter(l => l.level == SystemLogLevel.ERROR)
  })
  avgErrorRate = computed(() => {
    return (this.errors()?.length ?? 0) / differenceInCalendarDays(this.endDate(), this.startDate())
  })
  warnings = computed(() => {
    return this.filteredData()?.filter(l => l.level == SystemLogLevel.WARN)
  })
  avgWarningRate = computed(() => {
    return (this.warnings()?.length ?? 0) / differenceInCalendarDays(this.endDate(), this.startDate())
  })
  infos = computed(() => {
    return this.filteredData()?.filter(l => l.level == SystemLogLevel.INFO)
  })
  debugs = computed(() => {
    return this.filteredData()?.filter(l => l.level == SystemLogLevel.DEBUG)
  })
}
