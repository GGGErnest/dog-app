import { Component } from '@angular/core';
import { BreedListControllerComponent } from '../../controllers/breed-list-controller/breed-list-controller.component';


@Component({
  selector: 'app-breed-list-route',
  standalone: true,
  imports: [BreedListControllerComponent],
  templateUrl: './breed-list-route.component.html',
  styleUrl: './breed-list-route.component.scss'
})
export class BreedListRouteComponent {

}

