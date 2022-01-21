import { TestBed } from '@angular/core/testing';

import { GetallService } from './getall.service';

describe('GetallService', () => {
  let service: GetallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
