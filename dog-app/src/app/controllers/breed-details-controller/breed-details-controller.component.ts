import { Component, input } from '@angular/core';
import { Breed } from '../../models/breed';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breed-details-controller',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, RouterLink],
  templateUrl: './breed-details-controller.component.html',
  styleUrl: './breed-details-controller.component.scss'
})
export class BreedDetailsControllerComponent {
  breed = input.required<Breed>();
}
