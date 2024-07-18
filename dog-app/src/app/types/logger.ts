import { InjectionToken } from '@angular/core';

export interface Logger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
}

export const APP_LOGGER = new InjectionToken<Logger>('Appplication logger');
