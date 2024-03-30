import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListAfterCategoryComponent } from './products-list-after-category.component';

describe('ProductsListAfterCategoryComponent', () => {
  let component: ProductsListAfterCategoryComponent;
  let fixture: ComponentFixture<ProductsListAfterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListAfterCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsListAfterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
