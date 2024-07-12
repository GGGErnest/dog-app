import { ResolveFn } from '@angular/router';
import { BreedsService } from '../breeds.service';
import { inject } from '@angular/core';
import { Breed } from '../../models/breed';

export const breedsResolver: ResolveFn<Breed[]> = async () => {
  const breedsService = inject(BreedsService);
  let breeds: Breed[] = [];
  try {
    const response = await breedsService.getBreeds();
    breeds = response.result;
  } catch (error) {
    console.log(error);
  }
  return breeds;
};
