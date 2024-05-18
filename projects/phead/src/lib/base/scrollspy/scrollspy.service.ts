import { Injectable, NgZone, Signal, computed, inject, signal } from '@angular/core';

@Injectable()
export class ScrollspyService {
  private zone = inject(NgZone);
  private scrollspyIntersections = signal<Record<string, {
    ratio: number;
    top: number;
  }>>({});
  private elementMap = {} as Record<string, HTMLElement>;
  activeId: Signal<string | null>;

  private constructor(
    public readonly containerElement: Element,
  ) {
    this.activeId = computed(() => {
      return Object.entries(this.scrollspyIntersections())
        .filter(([, { ratio }]) => ratio > 0.2)
        .sort((a, b) => a[1].top - b[1].top)[0]
        ?.[0] ?? null;
    })
  }

  registerTrigger(id: string, element: HTMLElement) {
    this.elementMap[id] = element;
    this.scrollspyIntersections.update(map => {
      return {
        ...map,
        [id]: {
          ratio: 0,
          top: element.offsetTop,
        },
      }
    })
    return (value: number, top: number) => {
      this.zone.run(() => {
        this.scrollspyIntersections.update(map => {
          return {
            ...map,
            [id]: {
              ratio: value,
              top,
            },
          }
        });
      })
    }
  }

  focusElement(id: string) {
    this.elementMap[id]?.scrollIntoView();
  }

  static create(containerElement: Element) {
    return new ScrollspyService(containerElement);
  }
}
