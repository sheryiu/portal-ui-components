import { NgClass } from '@angular/common';
import { afterNextRender, Component, DestroyRef, effect, ElementRef, inject, Injector, input, signal, Signal, viewChild } from '@angular/core';
import { CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { ButtonModule } from 'portal-ui-ng/base';
import { TimeDisplayComponent } from 'portal-ui-ng/components';
import { SystemLog } from '../../../../../data/log.types';

const CHART_ORDER: string[] = ['Errors', 'Warnings', 'Infos', 'Debugs']

@Component({
  selector: 'demo-system-log-chart',
  imports: [
    TimeDisplayComponent,
    ButtonModule,
    NgClass
  ],
  templateUrl: './system-log-chart.component.html',
  styles: ``
})
export class SystemLogChartComponent {
  private injector = inject(Injector)
  private chartCanvas: Signal<ElementRef<HTMLCanvasElement>> = viewChild.required('chart', { read: ElementRef })

  startDate = input.required<Date>()
  endDate = input.required<Date>()
  errors = input.required<SystemLog[]>()
  warns = input.required<SystemLog[]>()
  infos = input.required<SystemLog[]>()
  debugs = input.required<SystemLog[]>()

  showErrors = signal(true)
  showWarns = signal(true)
  showInfos = signal(true)
  showDebugs = signal(false)

  private chart!: Chart;

  constructor() {
    afterNextRender(() => {
      Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement, Filler, Tooltip)
      this.chart = new Chart(this.chartCanvas().nativeElement, {
        type: 'line',
        data: {
          datasets: []
        },
        options: {
          maintainAspectRatio: false,
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          layout: {
            padding: {
              left: 0,
              right: 16,
              top: 12,
              bottom: 16
            }
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              beginAtZero: true,
              stacked: true,
              grid: {
                color: `rgb(255 255 255 / 0.1)`
              },
              ticks: {
                display: false,
                stepSize: 5,
              },
              border: {
                display: false,
                color: `rgb(255 255 255 / 0.15)`
              }
            }
          }
        }
      })
      effect(() => {
        this.chart.data.labels = eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => format(day, 'd MMM'));
        // Errors
        if (this.showErrors()) {
          if (this.chart.data.datasets.some(d => d.label == 'Errors')) {
            this.chart.data.datasets.find(d  => d.label == 'Errors')!.data = eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.errors().filter(l => isSameDay(l.timestamp, day)).length);
          } else {
            this.chart.data.datasets.splice(0, 0, {
              label: 'Errors',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.errors().filter(l => isSameDay(l.timestamp, day)).length),
              borderColor: `rgb(202, 56, 56)`,
              fill: true,
              backgroundColor: 'rgba(202, 56, 56, 0.2)',
              tension: 0.3,
            })
          }
        } else if (!this.showErrors() && this.chart.data.datasets.some(d => d.label == 'Errors')) {
          this.chart.data.datasets.splice(this.chart.data.datasets.findIndex(d => d.label == 'Errors'), 1)
        }
        // Warnings
        if (this.showWarns()) {
          if (this.chart.data.datasets.some(d => d.label == 'Warnings')) {
            this.chart.data.datasets.find(d  => d.label == 'Warnings')!.data = eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.warns().filter(l => isSameDay(l.timestamp, day)).length);
          } else {
            this.chart.data.datasets.splice(0, 0, {
              label: 'Warnings',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.warns().filter(l => isSameDay(l.timestamp, day)).length),
              borderColor: `rgb(176, 121, 20)`,
              fill: true,
              backgroundColor: 'rgba(176, 121, 20, 0.1)',
              tension: 0.3,
            })
          }
        } else if (!this.showWarns() && this.chart.data.datasets.some(d => d.label == 'Warnings')) {
          this.chart.data.datasets.splice(this.chart.data.datasets.findIndex(d => d.label == 'Warnings'), 1)
        }
        // Infos
        if (this.showInfos()) {
          if (this.chart.data.datasets.some(d => d.label == 'Infos')) {
            this.chart.data.datasets.find(d  => d.label == 'Infos')!.data = eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.infos().filter(l => isSameDay(l.timestamp, day)).length);
          } else {
            this.chart.data.datasets.splice(0, 0, {
              label: 'Infos',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.infos().filter(l => isSameDay(l.timestamp, day)).length),
              borderColor: `rgb(47, 112, 153)`,
              fill: true,
              backgroundColor: 'rgba(47, 112, 153, 0.1)',
              tension: 0.3,
            })
          }
        } else if (!this.showInfos() && this.chart.data.datasets.some(d => d.label == 'Infos')) {
          this.chart.data.datasets.splice(this.chart.data.datasets.findIndex(d => d.label == 'Infos'), 1)
        }
        // Debugs
        if (this.showDebugs() && !this.chart.data.datasets.some(d => d.label == 'Debugs')) {
          if (this.chart.data.datasets.some(d => d.label == 'Debugs')) {
            this.chart.data.datasets.find(d  => d.label == 'Debugs')!.data = eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.debugs().filter(l => isSameDay(l.timestamp, day)).length);
          } else {
            this.chart.data.datasets.splice(0, 0, {
              label: 'Debugs',
              data: eachDayOfInterval({ start: this.startDate(), end: this.endDate() }).map(day => this.debugs().filter(l => isSameDay(l.timestamp, day)).length),
              borderColor: `rgb(53, 69, 83)`,
              fill: true,
              backgroundColor: 'rgba(53, 69, 83, 0.1)',
              tension: 0.3,
            })
          }
        } else if (!this.showDebugs() && this.chart.data.datasets.some(d => d.label == 'Debugs')) {
          this.chart.data.datasets.splice(this.chart.data.datasets.findIndex(d => d.label == 'Debugs'), 1)
        }
        this.chart.data.datasets.sort((a, b) => CHART_ORDER.indexOf(a.label!) - CHART_ORDER.indexOf(b.label!))
        this.chart.update();
      }, { injector: this.injector })
      this.injector.get(DestroyRef).onDestroy(() => {
        this.chart.destroy();
      })
    })
  }
}
