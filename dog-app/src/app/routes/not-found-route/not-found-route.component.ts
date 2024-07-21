import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found-route',
  standalone: true,
  imports: [],
  templateUrl: './not-found-route.component.html',
  styleUrl: './not-found-route.component.scss'
})
export class NotFoundRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }
}
