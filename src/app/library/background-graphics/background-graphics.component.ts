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
  styles: ``
})
export class BackgroundGraphicsComponent implements AfterViewInit {

  @ViewChild('canvas') private canvas!: ElementRef<HTMLCanvasElement>;
  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService, { optional: true });
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.draw('dark');
    this.themeService?.currentTheme$.pipe(
      tap((theme) => this.draw(theme)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe()
  }

  private draw(theme: 'dark' | 'light') {
    if (isPlatformServer(this.platformId)) return;
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const points = [];
    const maxDots = window.innerWidth * window.innerHeight / ((window.devicePixelRatio - 1)/3 + 1) / 50_000;
    for (let i = 0; i < maxDots; i++) {
      points.push({
        x: Math.floor((Math.random() * 1.5 - 0.25) * window.innerWidth),
        y: Math.floor((Math.random() * 1.5 - 0.25) * window.innerHeight)
      });
    }
    points.push({ x: 0, y: 0 });
    points.push({ x: window.innerWidth, y: 0 });
    points.push({ x: 0, y: window.innerHeight });
    points.push({ x: window.innerWidth, y: window.innerHeight });
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
