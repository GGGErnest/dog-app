import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreedDetailsControllerComponent } from '../../controllers/breed-details-controller/breed-details-controller.component';

@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [BreedDetailsControllerComponent],
  templateUrl: './breed-detail-route.component.html',
  styleUrl: './breed-detail-route.component.scss'
})
export class BreedDetailRouteComponent {

  private readonly _activatedRouteSnapshot = inject(ActivatedRoute);
  public breed = this._activatedRouteSnapshot.snapshot.data['breed'];
}
