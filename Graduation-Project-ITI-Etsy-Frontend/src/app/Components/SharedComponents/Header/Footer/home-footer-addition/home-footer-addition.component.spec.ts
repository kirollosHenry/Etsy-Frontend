import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFooterAdditionComponent } from './home-footer-addition.component';

describe('HomeFooterAdditionComponent', () => {
  let component: HomeFooterAdditionComponent;
  let fixture: ComponentFixture<HomeFooterAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFooterAdditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFooterAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
