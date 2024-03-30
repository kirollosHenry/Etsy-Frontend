import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFooterAdditionNotLogInComponent } from './home-footer-addition-not-log-in.component';

describe('HomeFooterAdditionNotLogInComponent', () => {
  let component: HomeFooterAdditionNotLogInComponent;
  let fixture: ComponentFixture<HomeFooterAdditionNotLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFooterAdditionNotLogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFooterAdditionNotLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
