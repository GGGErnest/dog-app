import { TestBed } from '@angular/core/testing';
import { BreedsService } from './breeds.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { environment } from '../../environments/environment';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Breed } from '../models/breed';
import { ServerResponse, GetAllReturValue } from '../types/api/types';

describe('BreedsService', () => {
  let httpClientController: HttpTestingController;
  let httpClient: HttpClient;
  let breedsService: BreedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    httpClientController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    breedsService = TestBed.inject(BreedsService);
  });

  it('should be created', () => {
    expect(breedsService).toBeTruthy();
  });

  describe('getBreeds', () => {
    it('makes a get request with the right params', async () => {
      const page = 1;
      const pageSize = 10;
      const sort = 'id';
      const sortDir = 'desc';
      const responsePromise = breedsService.getBreeds(page, pageSize, sort, sortDir);
      const resp = httpClientController.expectOne(`${environment.apiUrl}/breeds/list/all?page=${page}&size=${pageSize}&sort=${sort}&sortDir=${sortDir}`);
      expect(resp.request.method).toBe('GET');

      const mockResponse: ServerResponse<GetAllReturValue<Breed>> = {
        result: {
          data: [],
          total: 0
        }
      };
      resp.flush(mockResponse);

      expect(await responsePromise).toEqual(mockResponse);
    })
  })

  describe('getBreedDetail', () => {
    it('makes a get request with the right params', async () => {
      const breedId = 'akita';
      const responsePromise = breedsService.getBreedDetail(breedId);
      const resp = httpClientController.expectOne(`${environment.apiUrl}/breeds/detail/${breedId}`)
      expect(resp.request.method).toBe('GET');

      const mockResponse: ServerResponse<Breed> = {
        result: {} as Breed
      };
      resp.flush(mockResponse);

      expect(await responsePromise).toEqual(mockResponse);
    })
  })
});
