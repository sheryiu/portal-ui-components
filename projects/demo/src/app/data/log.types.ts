export type SystemLog = {
  id: string;
  timestamp: Date;
  level: SystemLogLevel;
  message: string;
  context: string | null;
  customerId: string | null;
  employeeId: string | null;
  ipAddress: string | null;
  detail: any | null;
}

export enum SystemLogLevel {
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error',
  DEBUG = 'Debug',
}