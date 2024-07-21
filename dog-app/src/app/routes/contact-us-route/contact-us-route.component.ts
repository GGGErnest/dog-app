import { Component, OnInit, inject } from '@angular/core';
import { ContactUsControllerComponent } from '../../controllers/contact-us-controller/contact-us-controller.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us-route',
  standalone: true,
  imports: [ContactUsControllerComponent],
  templateUrl: './contact-us-route.component.html',
  styleUrl: './contact-us-route.component.scss'
})
export class ContactUsRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }
}
