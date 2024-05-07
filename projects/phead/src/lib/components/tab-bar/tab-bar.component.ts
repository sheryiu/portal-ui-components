import { NgClass, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, HostBinding, NgZone, PLATFORM_ID, QueryList, ViewChildren, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EffectFn } from '@ngneat/effects-ng';
import { animationFrameScheduler, auditTime, combineLatestWith, observeOn, tap, withLatestFrom } from 'rxjs';
import { HoverableDirective } from '../../base';
import { TabBarService } from './tab-bar.service';

@Component({
  selector: 'phead-tab-bar',
  standalone: true,
  imports: [
    NgClass,
    HoverableDirective,
  ],
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'phead-tab-bar',
  }
})
export class TabBarComponent extends EffectFn implements AfterViewInit {
  private service = inject(TabBarService);
  tabs$$ = toSignal(this.service.tabs$);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  @ViewChildren('tabButton') private tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  @HostBinding('attr.data-selected') currentIndex: number | null = null;
  @HostBinding('style.--phead-selected-tab-width.px') hostSelectedTabWidth?: number;
  @HostBinding('style.--phead-selected-tab-x.px') hostSelectedTabX?: number;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  constructor() {
    super();
    if (this.service == null) throw 'Use TabBarComponent inside a container with the directive pheadTabBarContainer';
    if (isPlatformServer(this.platformId)) return;
    this.resizeObserver = new ResizeObserver(entries => {
      this.checkWidth();
    })
    this.mutationObserver = new MutationObserver(entries => {
      this.checkWidth();
    })
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.mutationObserver?.disconnect();
    })
  }

  private checkWidth = this.createEffectFn<void>(args$ => args$.pipe(
    combineLatestWith(this.service.tabs$),
    auditTime(100),
    observeOn(animationFrameScheduler),
    tap(([, tabs]) => {
      this.zone.run(() => {
        if (!this.elementRef.nativeElement) return;
        if (this.tabButtons.length == 0) return;
        const mostVisibleTab = tabs.toSorted((a, b) => a.intersectionRatio! > b.intersectionRatio! ? -1 : a.intersectionRatio! < b.intersectionRatio! ? 1 : 0).at(0)?.id;
        this.currentIndex = tabs.findIndex(tab => tab.id === mostVisibleTab);
        if (mostVisibleTab && this.currentIndex >= 0) {
          if (!this.tabButtons.get(this.currentIndex)?.nativeElement) return;
          const thisRect = this.elementRef.nativeElement.getBoundingClientRect();
          const btnRect = this.tabButtons.get(this.currentIndex)!.nativeElement!.getBoundingClientRect();
          this.hostSelectedTabWidth = btnRect.width;
          this.hostSelectedTabX = btnRect.x - thisRect.x;
        }
      })
    })
  ))

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.resizeObserver?.observe(this.elementRef.nativeElement);
    this.mutationObserver?.observe(this.elementRef.nativeElement, { childList: true, characterData: true, subtree: true });
    this.checkWidth();
  }

  onTabClick = this.createEffectFn<string>(args$ => args$.pipe(
    withLatestFrom(this.service.tabs$),
    tap(([id, tabs]) => {
      const el = tabs.find(t => t.id === id)?.elementRef;
      if (el) {
        this.service.scrollTo.emit(el)
      }
    })
  ))

}
