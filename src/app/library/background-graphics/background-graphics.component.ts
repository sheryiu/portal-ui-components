import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import Delaunator from 'delaunator';

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

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const points = [];
    const maxDots = window.innerWidth * window.innerHeight / window.devicePixelRatio / 20_000;
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
      ctx.fillStyle = `rgb(255 255 255 / ${ Math.random() * 0.01 })`
      ctx.fill(path);
    }
  }

}
