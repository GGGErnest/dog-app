import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreedDetailsControllerComponent } from '../../controllers/breed-details-controller/breed-details-controller.component';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [BreedDetailsControllerComponent, TitleCasePipe, MatIconModule, MatButtonModule, MatTooltipModule,
    RouterLink],
  templateUrl: './breed-detail-route.component.html',
  styleUrl: './breed-detail-route.component.scss'
})
export class BreedDetailRouteComponent implements OnInit {

  private readonly _activatedRouteSnapshot = inject(ActivatedRoute);
  private readonly _titleService = inject(Title);
  private readonly _activatedRout = inject(ActivatedRoute);

  public breed = this._activatedRouteSnapshot.snapshot.data['breed'];

  ngOnInit(): void {
    this._titleService.setTitle(this._activatedRout.snapshot.data['title']);
  }

}
