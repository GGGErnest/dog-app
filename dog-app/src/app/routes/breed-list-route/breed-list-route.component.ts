import { Component, OnInit, inject } from '@angular/core';
import { BreedListControllerComponent } from '../../controllers/breed-list-controller/breed-list-controller.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-breed-list-route',
  standalone: true,
  imports: [BreedListControllerComponent],
  templateUrl: './breed-list-route.component.html',
  styleUrl: './breed-list-route.component.scss'
})
export class BreedListRouteComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }
}

