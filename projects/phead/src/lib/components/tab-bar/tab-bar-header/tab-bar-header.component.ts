import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, DestroyRef, ElementRef, Input, PLATFORM_ID, inject } from '@angular/core';
import { nanoid } from 'nanoid';
import { TabBarService } from '../tab-bar.service';
import { TabBarHeaderSupplementaryDirective } from './tab-bar-header-supplementary.directive';

/**
 * Checks the nextElementSibling for intersection
 */
@Component({
  selector: 'phead-tab-bar-header',
  standalone: true,
  imports: [
    NgTemplateOutlet,
  ],
  templateUrl: './tab-bar-header.component.html',
  styles: ``,
  host: {
    class: 'phead-tab-bar-header',
  }
})
export class TabBarHeaderComponent implements AfterViewInit, AfterContentInit {
  private service = inject(TabBarService, { optional: true });
  id = nanoid();
  @Input() label?: string;
  @ContentChild(TabBarHeaderSupplementaryDirective) supplementaryDirective?: TabBarHeaderSupplementaryDirective;
  private io?: IntersectionObserver;
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.service?.registerTab({
        id: this.id,
        label: this.label ?? this.elementRef.nativeElement.innerText.trim(),
        elementRef: this.elementRef,
      })
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.service?.updateTab({
          id: this.id,
          label: this.label ?? this.elementRef.nativeElement.innerText.trim(),
        })
      })
    }
  }

  ngAfterContentInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.elementRef.nativeElement.nextElementSibling) {
        this.io = new IntersectionObserver(entries => {
          this.service?.updateTab({
            id: this.id,
            intersectionRatio: entries[0].intersectionRatio,
          })
        }, {
          threshold: Array(10).fill(0).map((_, i) => 0.1 * i),
          rootMargin: '-25% 0px',
          root: this.elementRef.nativeElement.closest('[pheadTabBarContainer]')
        });
        this.io?.observe(this.elementRef.nativeElement.nextElementSibling);
        this.destroyRef.onDestroy(() => {
          this.io?.disconnect();
        })
      }
    }
  }
}
