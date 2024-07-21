import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-route',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home-route.component.html',
  styleUrl: './home-route.component.scss'
})
export class HomeRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }


}
