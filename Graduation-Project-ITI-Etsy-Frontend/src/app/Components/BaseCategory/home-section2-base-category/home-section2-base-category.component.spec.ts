import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection2BaseCategoryComponent } from './home-section2-base-category.component';

describe('HomeSection2BaseCategoryComponent', () => {
  let component: HomeSection2BaseCategoryComponent;
  let fixture: ComponentFixture<HomeSection2BaseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection2BaseCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSection2BaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
