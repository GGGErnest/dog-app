import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { breedResolver } from './breed.resolver';

describe('breedResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => breedResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
