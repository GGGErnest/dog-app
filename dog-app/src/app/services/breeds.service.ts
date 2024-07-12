import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Breed } from '../models/breed';
import { firstValueFrom } from 'rxjs';
import { ServerResponse } from '../types/api/types';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {
  private readonly _baseUrl = 'http://localhost:3000/breeds/';
  private _httpClient = inject(HttpClient);


  public async getBreeds(page = 1, size = 10): Promise<ServerResponse<Breed>> {
    return firstValueFrom(this._httpClient.get<ServerResponse<Breed>>(`${this._baseUrl}list/all?$page={page}&size=${size}`));
  }

  public async getBreedDetail(breedId: string): Promise<ServerResponse<Breed>> {
    return firstValueFrom(this._httpClient.get<ServerResponse<Breed>>(`${this._baseUrl}details/${breedId}`));
  }
}
