import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Injector, NgZone, afterNextRender, booleanAttribute, contentChildren, effect, forwardRef, inject, input, linkedSignal, output, signal, untracked, viewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'pui-tab-bar',
  templateUrl: './tab-bar.component.html',
  host: {
    class: 'pui-tab-bar',
    '[style.--pui-selected-tab-width.px]': 'hostSelectedTabWidth()',
    '[style.--pui-selected-tab-height.px]': 'hostSelectedTabHeight()',
    '[style.--pui-selected-tab-x.px]': 'hostSelectedTabX()',
    '[style.--pui-selected-tab-y.px]': 'hostSelectedTabY()',
  },
  imports: [
    NgTemplateOutlet,
    HoverableDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabBarComponent),
      multi: true,
    }
  ]
})
export class TabBarComponent implements AfterViewInit, ControlValueAccessor {
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  tabs = contentChildren(TabDirective);
  private tabButtonsElement = viewChildren<ElementRef<HTMLElement>>('tabButton');
  inputCurrentTab = input<string | null>(null, { alias: 'currentTab' });
  inputDisabled = input(false, { transform: booleanAttribute, alias: 'disabled' })
  tabChange = output<string>();

  onChange?: (val: string) => void;
  onTouched?: () => void;

  protected currentTab = linkedSignal<string | null>(() => this.inputCurrentTab())
  protected disabled = linkedSignal(() => this.inputDisabled())

  private hostSelectedTabWidth = signal(0);
  private hostSelectedTabHeight = signal(0);
  private hostSelectedTabX = signal(0);
  private hostSelectedTabY = signal(0);

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

  writeValue(obj: any): void {
    this.currentTab.set(String(obj));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
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
      this.hostSelectedTabHeight.set(el!.nativeElement.getBoundingClientRect().height);
      this.hostSelectedTabX.set(el!.nativeElement.offsetLeft);
      this.hostSelectedTabY.set(el!.nativeElement.offsetTop);
    }
  }

  onTabClick(index: number, tab: TabDirective, tabElement: HTMLElement) {
    this.currentTab.set(tab.id())
    this.hostSelectedTabWidth.set(tabElement.getBoundingClientRect().width);
    this.hostSelectedTabHeight.set(tabElement.getBoundingClientRect().height);
    this.hostSelectedTabX.set(tabElement.offsetLeft);
    this.hostSelectedTabY.set(tabElement.offsetTop);
    this.onChange?.(tab.id())
    this.tabChange.emit(tab.id());
  }

}
