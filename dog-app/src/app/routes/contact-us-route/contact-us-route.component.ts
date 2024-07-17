import { Component } from '@angular/core';
import { ContactUsControllerComponent } from '../../controllers/contact-us-controller/contact-us-controller.component';

@Component({
  selector: 'app-contact-us-route',
  standalone: true,
  imports: [ContactUsControllerComponent],
  templateUrl: './contact-us-route.component.html',
  styleUrl: './contact-us-route.component.scss'
})
export class ContactUsRouteComponent {

}
