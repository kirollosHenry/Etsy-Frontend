import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccesfullyComponent } from './unsuccesfully.component';

describe('UnsuccesfullyComponent', () => {
  let component: UnsuccesfullyComponent;
  let fixture: ComponentFixture<UnsuccesfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuccesfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsuccesfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
