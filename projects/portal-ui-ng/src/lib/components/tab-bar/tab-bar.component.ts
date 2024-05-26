import { AfterViewInit, Component, DestroyRef, ElementRef, HostBinding, Injector, Input, NgZone, afterNextRender, contentChildren, effect, inject, input, output, signal, viewChildren } from '@angular/core';
import { ScrollspyContainerDirective, ScrollspyDocumentContainerDirective } from '../../base';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'pui-tab-bar',
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'pui-tab-bar',
  }
})
export class TabBarComponent implements AfterViewInit {
  @Input() scrollspy?: ScrollspyContainerDirective | ScrollspyDocumentContainerDirective;
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  tabs = contentChildren(TabDirective);
  private tabButtonsElement = viewChildren<ElementRef<HTMLElement>>('tabButton');
  inputCurrentTab = input<string | null>(null, { alias: 'currentTab' });
  currentTab = signal<string | null>(null);
  tabChange = output<string>();

  @HostBinding('style.--pui-selected-tab-width.px') hostSelectedTabWidth?: number;
  @HostBinding('style.--pui-selected-tab-x.px') hostSelectedTabX?: number;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.mutationObserver?.disconnect();
    })
  }

  ngAfterViewInit(): void {
    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(entries => {
        this.zone.run(() => {
          if (this.currentTab() != null) {
            this.update(this.tabs().find(t => t.id() === this.currentTab()!));
          }
        })
      })
      this.mutationObserver = new MutationObserver(entries => {
        this.zone.run(() => {
          if (this.currentTab() != null) {
            this.update(this.tabs().find(t => t.id() === this.currentTab()!));
          }
        })
      })
      this.resizeObserver.observe(this.elementRef.nativeElement);
      this.mutationObserver.observe(this.elementRef.nativeElement, { subtree: true, childList: true });
      this.currentTab.set(this.inputCurrentTab())
      effect(() => {
        let tab: TabDirective | undefined;
        if (this.currentTab() != null) {
          tab = this.tabs().find(t => t.id() === this.currentTab());
        } else if (this.scrollspy == null) {
          // only set to first tab when not connected to a scrollspy
          tab = this.tabs().at(0);
        }
        this.update(tab)
      }, { allowSignalWrites: true, injector: this.injector })
      if (this.scrollspy) {
        effect(() => {
          this.currentTab.set(this.scrollspy!.activeId() ?? null);
        }, { allowSignalWrites: true, injector: this.injector })
      }
    }, { injector: this.injector })
  }

  private update(currentTab: TabDirective | undefined) {
    if (currentTab == null) return;
    const el = this.tabButtonsElement().find(el => el.nativeElement.id === currentTab.id())
    if (el?.nativeElement) {
      this.currentTab.set(currentTab.id())
      this.hostSelectedTabWidth = el?.nativeElement.getBoundingClientRect().width;
      this.hostSelectedTabX = el?.nativeElement.offsetLeft;
    }
  }

  onTabClick(index: number, tab: TabDirective, tabElement: HTMLElement) {
    this.currentTab.set(tab.id())
    this.hostSelectedTabWidth = tabElement.getBoundingClientRect().width;
    this.hostSelectedTabX = tabElement.offsetLeft;
    this.tabChange.emit(tab.id());
    if (this.scrollspy) {
      this.scrollspy.service.focusElement(tab.id())
    }
  }

  // private checkWidth = this.createEffectFn<void>(args$ => args$.pipe(
  //   // combineLatestWith(this.service.tabs$),
  //   auditTime(50),
  //   observeOn(animationFrameScheduler),
  //   tap(() => {
  //     this.zone.run(() => {
  //       if (!this.elementRef.nativeElement) return;
  //       if (this.tabButtonsElement().length == 0) return;
  //       const mostVisibleTab = tabs.toSorted((a, b) => a.intersectionRatio! > b.intersectionRatio! ? -1 : a.intersectionRatio! < b.intersectionRatio! ? 1 : 0).at(0)?.id;
  //       this.currentIndex = tabs.findIndex(tab => tab.id === mostVisibleTab);
  //       if (mostVisibleTab && this.currentIndex >= 0) {
  //         if (!this.tabButtons.get(this.currentIndex)?.nativeElement) return;
  //         const thisRect = this.elementRef.nativeElement.getBoundingClientRect();
  //         const btnRect = this.tabButtons.get(this.currentIndex)!.nativeElement!.getBoundingClientRect();
  //         this.hostSelectedTabWidth = btnRect.width;
  //         this.hostSelectedTabX = btnRect.x - thisRect.x;
  //       }
  //     })
  //   })
  // ))

  // ngAfterViewInit(): void {
  //   this.resizeObserver?.observe(this.elementRef.nativeElement);
  //   this.mutationObserver?.observe(this.elementRef.nativeElement, { childList: true, characterData: true, subtree: true });
  //   this.checkWidth();
  // }

  // onTabClick = this.createEffectFn<string>(args$ => args$.pipe(
  //   withLatestFrom(this.service.tabs$),
  //   tap(([id, tabs]) => {
  //     const el = tabs.find(t => t.id === id)?.elementRef;
  //     if (el) {
  //       this.service.scrollTo.emit(el)
  //     }
  //   })
  // ))

}
