import { DestroyRef, Directive, ElementRef, HostListener, OnInit, booleanAttribute, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nanoid } from 'nanoid';
import { AccordionService } from './accordion.service';

@Directive({
  selector: '[puiAccordionTrigger]',
  standalone: true,
  exportAs: 'accordionTrigger'
})
export class AccordionTriggerDirective implements OnInit {
  elementRef = inject(ElementRef);
  private service = inject(AccordionService, { optional: true });
  opened = input(false, { transform: booleanAttribute });
  isOpened = signal<boolean>(false);
  disabled = input<boolean>(false, { alias: 'triggerDisabled' });

  readonly id = nanoid();

  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.isOpened.set(this.opened())
    }, { allowSignalWrites: true })
    effect(() => {
      this.service?.toggleTrigger(this.id, this.isOpened());
    })
  }

  @HostListener('click')
  private hostClick() {
    if (this.disabled()) return;
    if (this.service) {
      this.service.toggleTrigger(this.id, !this.isOpened());
    } else {
      this.isOpened.update(b => !b)
    }
  }

  ngOnInit(): void {
    this.service?.registerTrigger(this.id, this.opened()).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(opened => {
      this.isOpened.set(opened);
    });
  }

  toggle() {
    this.isOpened.update(b => !b)
  }

}
