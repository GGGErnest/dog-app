import { AfterViewInit, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, merge, startWith, switchMap } from 'rxjs';
import { Breed } from '../../models/breed';
import { BreedsService } from '../../services/breeds.service';
import { GetAllReturValue } from '../../types/api/types';
import { NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-breed-list-controller',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './breed-list-controller.component.html',
  styleUrl: './breed-list-controller.component.scss'
})
export class BreedListControllerComponent implements AfterViewInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _paginatedBreeds: GetAllReturValue<Breed> = this._activatedRoute.snapshot.data['breeds'];
  private _breedService = inject(BreedsService);

  public displayedColumns: string[] = ['id', 'subbreeds', 'actions'];
  public total = signal(this._paginatedBreeds.total);
  public isLoadingResults = signal(false);
  public breeds = signal<Breed[]>(this._paginatedBreeds.data ?? []);

  public paginator = viewChild.required(MatPaginator);
  public sort = viewChild.required(MatSort);

  public extractSubbreeds(subbreeds: Breed[]): string[] {
    return subbreeds.map((subbreed) => subbreed.id);
  }

  ngAfterViewInit(): void {

    this.sort().sortChange.subscribe(() => (this.paginator().pageIndex = 0));

    merge(this.sort().sortChange, this.paginator().page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults.set(true);
          return this._breedService.getBreeds(this.paginator().pageIndex + 1, this.paginator().pageSize, this.sort().active as keyof Breed, this.sort().direction);
        }),
        map(data => {
          this.isLoadingResults.set(false);
          if (data === null) {
            return [];
          }
          this.total.set(data.result.total);
          return data.result.data ?? [];
        })
      )
      .subscribe(data => (this.breeds.set(data)));
  }
}
