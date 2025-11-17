import { afterNextRender, Component, computed, DestroyRef, effect, ElementRef, inject, Injector, input, Signal, viewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, Filler, LinearScale, Tooltip } from 'chart.js';
import { groupBy } from 'lodash-es';
import { SystemLog } from '../../../../../data/log.types';

@Component({
  selector: 'demo-system-log-systems',
  imports: [],
  templateUrl: './system-log-systems.component.html',
})
export class SystemLogSystemsComponent {
  private injector = inject(Injector)
  private chartCanvas: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required('chart', { read: ElementRef })

  startDate = input.required<Date>()
  endDate = input.required<Date>()
  systemLogs = input.required<SystemLog[]>()

  private groupedLogs = computed(() => {
    // Object.groupBy is included in ES2024 of tsconfig
    return groupBy(this.systemLogs(), log => log.context ?? '--')
  })

  private chart!: Chart;

  constructor() {
    afterNextRender(() => {
      Chart.register(BarElement, BarController, CategoryScale, LinearScale, Filler, Tooltip)
      this.chart = new Chart(this.chartCanvas().nativeElement, {
        type: 'bar',
        data: {
          datasets: []
        },
        options: {
          indexAxis: 'y',
          maintainAspectRatio: false,
          layout: {
            autoPadding: true,
            padding: {
              left: 0,
              right: 16,
              top: 0,
              bottom: 16
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false
              },
              border: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 4,
                color: 'rgb(200 200 200)',
                font: {
                  size: 14,
                  weight: 500,
                  family: '"Nunito"'
                }
              }
            },
            y: {
              ticks: {
                mirror: true,
                z: 10,
                color: 'rgb(0 0 0)',
                font: {
                  size: 14,
                  weight: 500,
                  family: '"Nunito"'
                }
              },
              grid: {
                display: false
              },
              border: {
                display: true,
                color: 'rgb(105 105 105)',
              }
            }
          }
        }
      })
      effect(() => {
        const data = Object.entries(this.groupedLogs())
          .map(([key, list]) => ([key, list?.length ?? 0] as const))
          .sort(([, a], [, b]) => b - a)
        this.chart.data.labels = data.map(([key]) => key.toUpperCase());
        this.chart.data.datasets = [{
          label: 'Total number of events',
          data: data.map(([, num]) => num),
          backgroundColor: data.map((_, i) => `rgb(68 123 47 / ${ 1 - (i + 1) * 0.1 })`),
        }]
        this.chart.update();
      }, { injector: this.injector })
      this.injector.get(DestroyRef).onDestroy(() => {
        this.chart.destroy();
      })
    })
  }

}
