import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy-policy-route',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy-route.component.html',
  styleUrl: './privacy-policy-route.component.scss'
})
export class PrivacyPolicyRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }


}
