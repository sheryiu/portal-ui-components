import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, HostBinding, PLATFORM_ID, QueryList, ViewChildren, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TabBarService } from './tab-bar.service';

@Component({
  selector: 'core-tab-bar',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'core-tab-bar',
  }
})
export class TabBarComponent implements AfterViewInit {
  private service = inject(TabBarService);
  tabs$ = this.service.tabs$;
  private elRef = inject(ElementRef) as ElementRef<HTMLElement>;
  @ViewChildren('tabButton') private tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  @HostBinding('attr.data-selected') currentIndex: number | null = null;
  @HostBinding('style.--core-selected-tab-width.px') hostSelectedTabWidth?: number;
  @HostBinding('style.--core-selected-tab-x.px') hostSelectedTabX?: number;

  private resizeObserver?: ResizeObserver;
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformServer(this.platformId)) return;
    this.resizeObserver = new ResizeObserver(entries => {
      if (!this.elRef.nativeElement) return;
      if (this.tabButtons.length == 0) return;
      if (this.currentIndex == null) this.currentIndex = 0;
      if (!this.tabButtons.get(this.currentIndex)?.nativeElement) return;
      const thisRect = this.elRef.nativeElement.getBoundingClientRect();
      const btnRect = this.tabButtons.get(this.currentIndex)!.nativeElement!.getBoundingClientRect();
      this.hostSelectedTabWidth = btnRect.width;
      this.hostSelectedTabX = btnRect.x - thisRect.x;
    })
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.resizeObserver?.observe(this.elRef.nativeElement);
  }

}
