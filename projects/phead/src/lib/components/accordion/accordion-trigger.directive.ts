import { DestroyRef, Directive, HostListener, Input, OnChanges, OnInit, SimpleChanges, booleanAttribute, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nanoid } from 'nanoid';
import { AccordionService } from './accordion.service';

@Directive({
  selector: '[pheadAccordionTrigger]',
  standalone: true,
  exportAs: 'accordionTrigger'
})
export class AccordionTriggerDirective implements OnInit, OnChanges {
  private service = inject(AccordionService, { optional: true });
  isOpened$$ = signal<boolean>(false);

  readonly id = nanoid();
  @Input({ transform: booleanAttribute }) opened = false;

  private destroyRef = inject(DestroyRef);

  @HostListener('click')
  private hostClick() {
    if (this.service) {
      this.service.toggleTrigger(this.id, !this.isOpened$$());
    } else {
      this.isOpened$$.update(b => !b)
    }
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
