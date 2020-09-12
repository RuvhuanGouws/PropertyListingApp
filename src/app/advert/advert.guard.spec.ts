import { TestBed } from '@angular/core/testing';

import { AdvertGuard } from './advert.guard';

describe('AdvertGuard', () => {
  let guard: AdvertGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdvertGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
