import { AfterViewInit, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, merge, startWith, switchMap } from 'rxjs';
import { Breed } from '../../models/breed';
import { BreedsService } from '../../services/breeds.service';
import { GetAllReturValue } from '../../types/api/types';


@Component({
  selector: 'app-breed-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss'
})
export class BreedListComponent implements AfterViewInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _paginatedBreeds: GetAllReturValue<Breed> = this._activatedRoute.snapshot.data['breeds'];
  private _breedService = inject(BreedsService);

  public displayedColumns: string[] = ['breed', 'subbreed'];
  public total = signal(this._paginatedBreeds.total);
  public isLoadingResults = signal(false);
  public breeds = signal<Breed[]>(this._paginatedBreeds.data ?? []);

  public paginator = viewChild.required(MatPaginator);
  public sort = viewChild.required(MatSort);


  ngAfterViewInit(): void {

    this.sort().sortChange.subscribe(() => (this.paginator().pageIndex = 0));

    merge(this.sort().sortChange, this.paginator().page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults.set(true);
          console.log('get Breeds', this.paginator().pageIndex, this.paginator().pageSize, this.sort().active as keyof Breed, this.sort().direction)

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

