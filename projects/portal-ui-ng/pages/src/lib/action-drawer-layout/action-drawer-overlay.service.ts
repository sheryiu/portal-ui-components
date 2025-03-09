import { inject, Injectable, Injector, Provider, Type } from '@angular/core';
import { OVERLAY_DATA, PuiOverlayService } from 'portal-ui-ng/base';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerLayoutComponent, ActionDrawerLayoutDataProvider } from './action-drawer-layout';

@Injectable({
  providedIn: 'root'
})
export class ActionDrawerOverlayService {
  private overlay = inject(PuiOverlayService);
  private injector = inject(Injector);

  open<D>(
    dataProvider: Type<ActionDrawerLayoutDataProvider>,
    config: {
      width?: string;
      providers?: Array<Provider>;
      parent?: Injector;
      overlayData?: D;
    } = {
      width: '480px',
    }
  ) {
    return this.overlay.open(ActionDrawerLayoutComponent, {
      positionStrategy: this.overlay.position().global().right('0').centerVertically(),
      maxWidth: '90vw',
      width: config.width ?? '480px',
      height: '100%',
      hasBackdrop: true,
      backdropClass: 'pui-action-drawer-backdrop',
      closeOnBackdropClick: true,
      disposeOnNavigation: true,
      closeOnEscapeKeydown: true,
      animation: 'slideInEnd',
      data: config.overlayData,
      parentInjector: Injector.create({
        providers: [
          {
            provide: OVERLAY_DATA,
            useValue: config.overlayData,
          },
          {
            provide: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
            useClass: dataProvider,
          },
          ...config.providers ?? [],
        ],
        parent: config.parent ?? this.injector,
      }),
    })
  }
}
