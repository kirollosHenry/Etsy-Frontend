import { TestBed } from '@angular/core/testing';

import { BadgeCartService } from './badge-cart.service';

describe('BadgeCartService', () => {
  let service: BadgeCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadgeCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
