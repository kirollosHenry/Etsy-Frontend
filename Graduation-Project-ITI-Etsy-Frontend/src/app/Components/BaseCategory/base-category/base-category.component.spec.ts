import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCategoryComponent } from './base-category.component';

describe('BaseCategoryComponent', () => {
  let component: BaseCategoryComponent;
  let fixture: ComponentFixture<BaseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
