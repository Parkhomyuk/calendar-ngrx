import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationMonthHeaderNgrxComponent } from './presentation-month-header-ngrx.component';

describe('PresentationMonthHeaderNgrxComponent', () => {
  let component: PresentationMonthHeaderNgrxComponent;
  let fixture: ComponentFixture<PresentationMonthHeaderNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationMonthHeaderNgrxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationMonthHeaderNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
