import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBoardDayComponent } from './event-board-day.component';

describe('EventBoardDayComponent', () => {
  let component: EventBoardDayComponent;
  let fixture: ComponentFixture<EventBoardDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventBoardDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBoardDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
