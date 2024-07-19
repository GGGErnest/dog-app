import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Breed } from '../models/breed';
import { firstValueFrom } from 'rxjs';
import { GetAllReturValue, ServerResponse } from '../types/api/types';
import { SortDirection } from '@angular/material/sort';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {
  private readonly _baseUrl = `${environment.apiUrl}/breeds/`;
  private _httpClient = inject(HttpClient);


  public async getBreeds(page = 1, size = 10, sort: keyof Breed = 'id', sortDir: SortDirection = 'desc'): Promise<ServerResponse<GetAllReturValue<Breed>>> {
    return firstValueFrom(this._httpClient.get<ServerResponse<GetAllReturValue<Breed>>>(`${this._baseUrl}list/all?page=${page}&size=${size}&sort=${sort}&sortDir=${sortDir}`));
  }

  public async getBreedDetail(breedId: string): Promise<ServerResponse<Breed>> {
    return firstValueFrom(this._httpClient.get<ServerResponse<Breed>>(`${this._baseUrl}detail/${breedId}`));
  }
}
