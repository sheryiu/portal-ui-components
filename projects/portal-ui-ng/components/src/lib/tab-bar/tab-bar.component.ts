import { AfterViewInit, Component, DestroyRef, ElementRef, HostBinding, Injector, NgZone, afterNextRender, contentChildren, effect, inject, input, output, signal, viewChildren } from '@angular/core';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'pui-tab-bar',
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'pui-tab-bar',
  }
})
export class TabBarComponent implements AfterViewInit {
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
        } else {
          tab = this.tabs().at(0);
        }
        this.update(tab)
      }, { allowSignalWrites: true, injector: this.injector })
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
  }

}
