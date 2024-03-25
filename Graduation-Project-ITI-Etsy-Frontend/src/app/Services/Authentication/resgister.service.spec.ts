import { TestBed } from '@angular/core/testing';

import { ResgisterService } from './resgister.service';

describe('ResgisterService', () => {
  let service: ResgisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResgisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
