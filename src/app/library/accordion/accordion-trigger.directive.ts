import { DestroyRef, Directive, HostListener, Input, OnChanges, OnInit, SimpleChanges, booleanAttribute, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nanoid } from 'nanoid';
import { AccordionService } from './accordion.service';

@Directive({
  selector: '[coreAccordionTrigger]',
  standalone: true,
  exportAs: 'accordionTrigger'
})
export class AccordionTriggerDirective implements OnInit, OnChanges {
  private service = inject(AccordionService, { optional: true });
  isOpened$$ = signal<boolean>(true);

  readonly id = nanoid();
  @Input({ transform: booleanAttribute }) opened = false;

  private destroyRef = inject(DestroyRef);

  @HostListener('click')
  private hostClick() {
    this.isOpened$$.update(b => !b);
    this.service?.toggleTrigger(this.id, this.isOpened$$());
  }

  ngOnInit(): void {
      this.service?.registerTrigger(this.id, this.opened).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(opened => {
        this.isOpened$$.set(opened);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opened']) {
      this.isOpened$$.set(this.opened);
      this.service?.toggleTrigger(this.id, this.isOpened$$());
    }
  }

}
