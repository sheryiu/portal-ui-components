import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Injector, NgZone, afterNextRender, booleanAttribute, contentChildren, effect, inject, input, linkedSignal, output, signal, untracked, viewChildren } from '@angular/core';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'pui-tab-bar',
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'pui-tab-bar',
    '[style.--pui-selected-tab-width.px]': 'hostSelectedTabWidth()',
    '[style.--pui-selected-tab-x.px]': 'hostSelectedTabX()',
  },
  imports: [
    NgTemplateOutlet,
    HoverableDirective,
  ]
})
export class TabBarComponent implements AfterViewInit {
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  tabs = contentChildren(TabDirective);
  private tabButtonsElement = viewChildren<ElementRef<HTMLElement>>('tabButton');
  inputCurrentTab = input<string | null>(null, { alias: 'currentTab' });
  inputDisabled = input(false, { transform: booleanAttribute, alias: 'disabled' })
  tabChange = output<string>();

  protected currentTab = linkedSignal<string | null>(() => this.inputCurrentTab())
  protected disabled = linkedSignal(() => this.inputDisabled())

  private hostSelectedTabWidth = signal(0);
  private hostSelectedTabX = signal(0);

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
          const currentTab = this.currentTab();
          if (currentTab != null) {
            this.updateStyle(this.tabs().find(t => t.id() === currentTab));
          }
        })
      })
      this.mutationObserver = new MutationObserver(entries => {
        this.zone.run(() => {
          const currentTab = this.currentTab();
          if (currentTab != null) {
            this.updateStyle(this.tabs().find(t => t.id() === currentTab));
          }
        })
      })
      this.resizeObserver.observe(this.elementRef.nativeElement);
      this.mutationObserver.observe(this.elementRef.nativeElement, { subtree: true, childList: true });
      effect(() => {
        let tab: TabDirective | undefined;
        const input = this.inputCurrentTab();
        if (input != null) {
          tab = this.tabs().find(t => untracked(() => t.id()) === input);
        } else {
          tab = this.tabs().at(0);
        }
        untracked(() => this.updateStyle(tab))
      }, { injector: this.injector })
    }, { injector: this.injector })
  }

  private updateStyle(currentTab: TabDirective | undefined) {
    if (currentTab == null) return;
    const el = this.tabButtonsElement().find(el => el.nativeElement.id === currentTab.id())
    if (el?.nativeElement) {
      this.hostSelectedTabWidth.set(el!.nativeElement.getBoundingClientRect().width);
      this.hostSelectedTabX.set(el!.nativeElement.offsetLeft);
    }
  }

  onTabClick(index: number, tab: TabDirective, tabElement: HTMLElement) {
    this.currentTab.set(tab.id())
    this.hostSelectedTabWidth.set(tabElement.getBoundingClientRect().width);
    this.hostSelectedTabX.set(tabElement.offsetLeft);
    this.tabChange.emit(tab.id());
  }

}
