import { ResolveFn } from '@angular/router';
import { BreedsService } from '../breeds.service';
import { inject } from '@angular/core';
import { Breed } from '../../models/breed';
import { GetAllReturValue } from '../../types/api/types';

export const breedsResolver: ResolveFn<GetAllReturValue<Breed>> = async () => {
  const breedsService = inject(BreedsService);
  let breeds: GetAllReturValue<Breed> = { data: null, total: 0 };
  try {
    const response = await breedsService.getBreeds();
    breeds = response.result;
  } catch (error) {
    console.log(error);
  }
  return breeds;
};
