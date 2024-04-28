import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Delaunator from 'delaunator';
import { tap } from 'rxjs';
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

  ngAfterViewInit(): void {
    this.draw('dark');
    this.themeService?.currentTheme$.pipe(
      tap((theme) => this.draw(theme)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe()
  }

  private draw(theme: 'dark' | 'light') {
    if (isPlatformServer(this.platformId)) return;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const { width, height } = rect;
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const points = [];
    const maxDots = width * height / ((window.devicePixelRatio - 1)/3 + 1) / 50_000;
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
      if (theme === 'dark') {
        ctx.fillStyle = `rgb(255 255 255 / ${ Math.random() * 0.025 })`
      } else {
        ctx.fillStyle = `rgb(0 0 0 / ${ Math.random() * 0.07 })`
      }
      ctx.fill(path);
    }
  }

}
