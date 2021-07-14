import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationAreaGridComponent } from './presentation-area-grid.component';

describe('PresentationAreaGridComponent', () => {
  let component: PresentationAreaGridComponent;
  let fixture: ComponentFixture<PresentationAreaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationAreaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationAreaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
