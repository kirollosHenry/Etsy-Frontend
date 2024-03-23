import { TestBed } from '@angular/core/testing';

import { BaseCategoryService } from './base-category.service';

describe('BaseCategoryService', () => {
  let service: BaseCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
