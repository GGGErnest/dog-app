import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Breed } from '../../models/breed';
import { BreedsService } from '../breeds.service';

export const breedResolver: ResolveFn<Breed> = async (route, state) => {
  const breedsService = inject(BreedsService);
  const breedId = route.params['id'];
  if (breedId) {
    try {
      const response = await breedsService.getBreedDetail(breedId);
      if (response.result) {
        return response.result;
      }
    } catch (error) {
      throw error;
    }
  }

  throw 'Breed id not provided';
};
