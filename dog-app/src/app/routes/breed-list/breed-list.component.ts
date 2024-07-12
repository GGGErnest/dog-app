import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BreedsDataSource } from '../../services/breeds-data-source';

@Component({
  selector: 'app-breed-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss'
})
export class BreedListComponent {
  private _activatedRoute = inject(ActivatedRoute)
  public tableDataSource = new BreedsDataSource(this._activatedRoute.snapshot.data['breeds'])
}
