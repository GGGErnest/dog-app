import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Breed } from '../../models/breed';
import { APP_LOGGER } from '../../types/logger';
import { BreedsService } from '../breeds.service';
import { NotificationService } from '../notification.service';

export const breedResolver: ResolveFn<Breed> = async (route, state) => {
  const breedsService = inject(BreedsService);
  const breedId = route.params['id'];
  const notificationService = inject(NotificationService);
  const logger = inject(APP_LOGGER);

  if (breedId) {
    try {

      const response = await breedsService.getBreedDetail(breedId);
      if (response.result) {
        return response.result;
      }

      notificationService.error('Sorry we could not find the breed you requested');
      throw 'Sorry we could hot find the breed';

    } catch (error) {
      logger.error('Sorry something went wrong');
      throw error;
    }
  }

  notificationService.error('Breed id not provided');
  throw 'Breed id not provided';
};
