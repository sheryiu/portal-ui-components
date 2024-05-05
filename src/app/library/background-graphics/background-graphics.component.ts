import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, afterNextRender, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Delaunator from 'delaunator';
import { ObservedValueOf, tap } from 'rxjs';
import { ThemeService } from '../../components/services/theme.service';

@Component({
  selector: 'core-background-graphics',
  standalone: true,
  imports: [],
  templateUrl: './background-graphics.component.html',
  host: {
    class: 'core-background-graphics',
  }
})
export class BackgroundGraphicsComponent implements AfterViewInit {

  @ViewChild('canvas') private canvas!: ElementRef<HTMLCanvasElement>;
  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService, { optional: true });
  private destroyRef = inject(DestroyRef);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private currentTheme?: ObservedValueOf<ThemeService['currentTheme$']>;
  private ro?: ResizeObserver;
  private canvasSizeSet = false;

  constructor() {
    afterNextRender(() => {
      this.themeService?.currentTheme$.pipe(
        tap((theme) => {
          if (theme === this.currentTheme) return;
          this.currentTheme = theme;
          this.draw();
        }),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe()
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.ro = new ResizeObserver(entries => {
      if (!this.canvasSizeSet && this.currentTheme) {
        this.draw();
      }
    })
    this.ro.observe(this.canvas.nativeElement)
    this.destroyRef.onDestroy(() => {
      this.ro?.disconnect();
    })
  }

  private draw() {
    if (isPlatformServer(this.platformId)) return;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const { width, height } = rect;
    if (width == 0 || height == 0) return;
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
    this.canvasSizeSet = true;
    this.ro?.disconnect();
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const points = [];
    const maxDots = width * height / Math.log(window.devicePixelRatio + 1) / 30_000;
    for (let i = 0; i < maxDots; i++) {
      points.push({
        x: Math.floor((Math.random() * 1.5 - 0.25) * width),
        y: Math.floor((Math.random() * 1.5 - 0.25) * height)
      });
    }
    points.push({ x: 0, y: 0 });
    points.push({ x: width, y: 0 });
    points.push({ x: 0, y: height });
    points.push({ x: width, y: height });
    const triangles = Delaunator.from(points, ({ x }) => x, ({ y }) => y).triangles;
    for (let i = 0; i < triangles.length; i += 3) {
      const path = new Path2D();
      path.moveTo(points[triangles[i]].x, points[triangles[i]].y);
      path.lineTo(points[triangles[i + 1]].x, points[triangles[i + 1]].y);
      path.lineTo(points[triangles[i + 2]].x, points[triangles[i + 2]].y);
      if (this.currentTheme === 'dark') {
        ctx.fillStyle = `rgb(255 255 255 / ${ Math.random() * 0.025 })`
      } else {
        ctx.fillStyle = `rgb(0 0 0 / ${ Math.random() * 0.07 })`
      }
      ctx.fill(path);
    }
  }

}
