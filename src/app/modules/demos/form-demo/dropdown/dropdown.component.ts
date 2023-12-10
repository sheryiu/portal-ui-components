import { FocusMonitor } from '@angular/cdk/a11y';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, ContentChildren, DestroyRef, ElementRef, HostBinding, Injector, QueryList, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, skip, takeUntil } from 'rxjs';
import { DropdownOptionDirective } from '../dropdown-panel/dropdown-option.directive';
import { DROPDOWN_PANEL_DATA, DropdownPanelComponent, DropdownPanelData } from '../dropdown-panel/dropdown-panel.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements AfterViewInit {

  @HostBinding('tabIndex') private hostTabIndex = '0';
  @ContentChildren(DropdownOptionDirective) private options!: QueryList<DropdownOptionDirective>;

  private _elementRef = inject(ElementRef) as ElementRef<Element>;
  private _focusMonitor = inject(FocusMonitor);
  private _overlayManager = inject(Overlay);
  private _injector = inject(Injector);

  private destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngAfterViewInit(): void {
    if (!(this._elementRef.nativeElement.firstElementChild instanceof HTMLElement)) return;
    this._focusMonitor.monitor(this._elementRef.nativeElement.firstElementChild as HTMLElement).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((via) => {
      console.log(via)
      if (via === 'mouse' || via === 'program') {
        this.openOverlay();
      }
    })
  }

  private openOverlay() {
    const overlayRef = this._overlayManager.create({
      positionStrategy: this._overlayManager.position().flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([
          { originX: 'start', overlayX: 'start', originY: 'center', overlayY: 'center' },
        ]),
      scrollStrategy: this._overlayManager.scrollStrategies.reposition(),
      disposeOnNavigation: true,
      width: this._elementRef.nativeElement.getBoundingClientRect().width,
      hasBackdrop: false,
    });
    const portal = new ComponentPortal(DropdownPanelComponent, undefined, Injector.create({
      parent: this._injector,
      providers: [{
        provide: DROPDOWN_PANEL_DATA,
        useValue: {
          options: this.options,
        } as DropdownPanelData,
      }]
    }));
    overlayRef.attach(portal);
    const refDestroyed$ = new Subject<void>();
    overlayRef.outsidePointerEvents().pipe(
      skip(1),
      takeUntil(refDestroyed$),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
      refDestroyed$.next();
      refDestroyed$.complete();
    })
  }

}
