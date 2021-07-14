import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigatorComponent } from './main-navigator.component';

describe('MainNavigatorComponent', () => {
  let component: MainNavigatorComponent;
  let fixture: ComponentFixture<MainNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
