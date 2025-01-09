import { DecimalPipe } from '@angular/common';
import { afterNextRender, Component, computed, effect, ElementRef, inject, Injector, Signal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { differenceInCalendarDays, eachDayOfInterval, endOfDay, format, isSameDay, startOfDay, sub } from 'date-fns';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, TimeDisplayComponent, TooltipModule } from 'portal-ui-ng/components';
import { SystemLogLevel } from '../../../../data/log.types';
import { SystemLogDataService } from '../../../../data/system-log-data.service';

@Component({
  selector: 'demo-system-log-dashboard',
  standalone: true,
  imports: [
    TooltipModule,
    DividerComponent,
    TimeDisplayComponent,
    ButtonModule,
    DecimalPipe
  ],
  templateUrl: './system-log-dashboard.component.html',
  styles: ``
})
export class SystemLogDashboardComponent {
  private dataService = inject(SystemLogDataService)
  private injector = inject(Injector)
  private rawData = toSignal(this.dataService.getList())
  private chartCanvas: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required('chart', { read: ElementRef })

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

  constructor() {
    afterNextRender(() => {
      Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement, Filler)
      effect(() => {
        // TODO
        if (this.errors() == null || this.errors()?.length == 0) return;
        console.log(eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.errors()?.filter(l => isSameDay(l.timestamp, day))))
        new Chart(this.chartCanvas().nativeElement, {
          type: 'line',
          data: {
            labels: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => format(day, 'd MMM')),
            datasets: [{
              label: 'Errors',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.errors()?.filter(l => isSameDay(l.timestamp, day))?.length ?? 0),
              borderColor: (ctx, v) => `rgb(202, 56, 56)`,
              fill: true,
              backgroundColor: 'rgba(202, 56, 56, 0.2)',
              tension: 0.3,
            }, {
              label: 'Warnings',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.warnings()?.filter(l => isSameDay(l.timestamp, day))?.length ?? 0),
              borderColor: (ctx, v) => `rgb(176, 121, 20)`,
              fill: true,
              backgroundColor: 'rgba(176, 121, 20, 0.1)',
              tension: 0.3,
            },]
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: 0,
              autoPadding: false,
            },
            scales: {
              x: {
                display: false,
                ticks: {
                  mirror: true,
                  // padding: -4,
                  display: false,
                },
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                }
              },
              y: {
                display: false,
                beginAtZero: true,
                suggestedMax: (this.errors()!.length) * 3 / differenceInCalendarDays(this.endDate(), this.startDate()),
                ticks: {
                  mirror: true,
                  stepSize: 1,
                  display: false,
                },
                border: {
                  display: false,
                }
              }
            }
          }
        })
      }, { injector: this.injector })
    })
  }
}
