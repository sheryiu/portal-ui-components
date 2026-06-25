import { OverlayConfig } from '@angular/cdk/overlay';
import { InjectionToken, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';

type OverlayAnimationConfig = {
  animateEnter: string;
  animateLeave: string;
  /** name of the @keyframe used in animateLeave */
  leaveAnimationName: string;
} | {
  animateEnter?: never;
  animateLeave?: never;
  leaveAnimationName?: never;
};

export type PuiOverlayConfig<D> = OverlayConfig & {
  /** backdrop transition doesn't change with this value, please manually modify it */
  // TODO make backdrop gently disappear
  parentInjector?: Injector | undefined;
  viewContainerRef?: ViewContainerRef | null | undefined;
  data?: D;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKeydown?: boolean;
  stayOpenedOnOutsideClicks?: boolean;
  /**
   * can be used to customized which events to ignore when `stayOpenedOnOutsideClicks` is `false | undefined`
   * @see stayOpenedOnOutsideClicks
   */
  stayOpenedOnOutsideClicksContainedIn?: Element | Element[];
} & OverlayAnimationConfig;

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONFIG = new InjectionToken<PuiOverlayConfig<unknown>>('overlay config');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');
