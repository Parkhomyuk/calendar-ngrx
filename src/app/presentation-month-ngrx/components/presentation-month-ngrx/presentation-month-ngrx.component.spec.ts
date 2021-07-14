import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationMonthNgrxComponent } from './presentation-month-ngrx.component';

describe('PresentationMonthNgrxComponent', () => {
  let component: PresentationMonthNgrxComponent;
  let fixture: ComponentFixture<PresentationMonthNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationMonthNgrxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationMonthNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
