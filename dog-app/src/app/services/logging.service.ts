import { Injectable } from '@angular/core';
import { Logger } from '../types/logger';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerServise implements Logger {

  info(message: string, data: unknown): void {
    console.info(message, data);
  }
  warn(message: string, data: unknown): void {
    console.warn(message, data);
  }
  error(message: string, data: unknown): void {
    console.error(message, data);
  }
}
