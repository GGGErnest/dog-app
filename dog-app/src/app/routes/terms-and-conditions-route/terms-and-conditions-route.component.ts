import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions-route',
  standalone: true,
  imports: [],
  templateUrl: './terms-and-conditions-route.component.html',
  styleUrl: './terms-and-conditions-route.component.scss'
})
export class TermsAndConditionsRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }
}
