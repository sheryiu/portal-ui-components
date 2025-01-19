export enum ErrorOverlayDuration {
  LONG = 'Long',
  INFINITE = 'Infinite'
}

export type ErrorOverlayData = {
  message: string;
  icon: string;
  duration: ErrorOverlayDuration;
}