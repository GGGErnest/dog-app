import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APP_LOGGER } from '../../types/logger';
import { NotificationService } from '../notification.service';

export const errorHandlingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const logger = inject(APP_LOGGER);
  const notificationService = inject(NotificationService);

  return next(req).pipe(catchError(err => {
    if (err instanceof HttpErrorResponse) {
      notificationService.error(err.message);
    }

    logger.error('Response Error', err);

    return throwError(() => err);
  }));
};
