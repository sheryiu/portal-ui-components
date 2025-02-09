export enum SnackbarDuration {
  LONG = 'Long',
  INFINITE = 'Infinite'
}

export type SnackbarData = {
  message: string;
  icon?: string;
  duration: SnackbarDuration;
}

export type SnackbarErrorData = {
  message: string | Error;
  icon?: string;
  duration: SnackbarDuration;
}