import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact-us-controller',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact-us-controller.component.html',
  styleUrl: './contact-us-controller.component.scss'
})
export class ContactUsControllerComponent {
  formBuilder = inject(FormBuilder);
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
  snackBar = inject(MatSnackBar);
  private readonly _renotificationService = inject(NotificationService);

  onSubmit() {
    if (this.contactForm.valid) {
      this._renotificationService.message('Message sent!');
      this.contactForm.reset();
      return;
    }

    this._renotificationService.error('Sorry, fill all the required field');
  }
}
