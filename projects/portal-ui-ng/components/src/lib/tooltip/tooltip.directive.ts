import { FocusMonitor } from '@angular/cdk/a11y';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { DestroyRef, Directive, ElementRef, Type, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';
import { TooltipComponent, TooltipData } from './tooltip.component';

const StartPositions: ConnectedPosition[] = [
  { originX: 'start', overlayX: 'end', originY: 'center', overlayY: 'center', offsetX: -8 },
]
const EndPositions: ConnectedPosition[] = [
  { originX: 'end', overlayX: 'start', originY: 'center', overlayY: 'center', offsetX: 8 },
]
const TopPositions: ConnectedPosition[] = [
  { originX: 'center', overlayX: 'center', originY: 'top', overlayY: 'bottom', offsetY: -8 },
]
const BottomPositions: ConnectedPosition[] = [
  { originX: 'center', overlayX: 'center', originY: 'bottom', overlayY: 'top', offsetY: 8 },
]

@Directive({
  selector: '[puiTooltip]',
  standalone: true,
  host: {
    '(pointerover)': 'onOver()',
    '(pointerleave)': 'onLeave()',
  }
})
export class TooltipDirective {

  private focusMonitor = inject(FocusMonitor);
  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private overlay = inject(PuiOverlayService, { optional: true });
  private overlayRef?: PuiOverlayRef;
  private destroyRef = inject(DestroyRef);

  tooltip = input<string | null | undefined>(undefined, { alias: 'puiTooltip' });
  component = input<Type<unknown> | null>(null, { alias: 'puiTooltipComponent' });
  position = input<'start' | 'end' | 'top' | 'bottom'>('bottom', { alias: 'puiTooltipPosition' });

  constructor() {
    this.focusMonitor.monitor(this.elementRef).pipe(
      takeUntilDestroyed(),
    ).subscribe(focusOrigin => {
      if (focusOrigin == null) {
        this.closeTooltip();
      } else {
        this.showTooltip();
      }
    })
    this.destroyRef.onDestroy(() => {
      this.closeTooltip()
    })
  }

  onOver() {
    this.showTooltip();
  }

  onLeave() {
    this.closeTooltip();
  }

  private showTooltip() {
    if (this.overlayRef) return;
    if (!this.tooltip()) return;
    this.overlayRef = this.overlay?.open<TooltipComponent, TooltipData>(
      TooltipComponent,
      {
        positionStrategy: this.overlay.position().flexibleConnectedTo(this.elementRef.nativeElement)
          .withPositions(
            this.position() === 'start'
              ? StartPositions
              : this.position() === 'bottom'
              ? BottomPositions
              : this.position() === 'end'
              ? EndPositions
              : TopPositions
          )
          .withViewportMargin(16)
          .withPush(true),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        disposeOnNavigation: true,
        panelClass: 'pui-tooltip-overlay',
        data: {
          message: this.tooltip(),
          component: this.component(),
        }
      }
    )
    this.overlayRef?.afterClosed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.overlayRef = undefined;
    })
  }

  private closeTooltip() {
    this.overlayRef?.close();
  }

}
