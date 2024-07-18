import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  message(message: string): void {
    this._snackBar.open(message);
  }

  error(message: string): void {
    this._snackBar.open(message)
  }
}
