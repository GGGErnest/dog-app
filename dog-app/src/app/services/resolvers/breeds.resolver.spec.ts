import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { breedsResolver } from './breeds.resolver';

describe('breedsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => breedsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
