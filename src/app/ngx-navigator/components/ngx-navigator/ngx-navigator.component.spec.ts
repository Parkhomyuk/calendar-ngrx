import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNavigatorComponent } from './ngx-navigator.component';
import * as moment from 'moment';

describe('NgxNavigatorComponent', () => {
  let component: NgxNavigatorComponent;
  let fixture: ComponentFixture<NgxNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {    
    fixture = TestBed.createComponent(NgxNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     
    component.onNextMonth()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('it shoul be a next month', ()=>{
    expect(component.currentPeriod).toEqual(component.currentPeriod.set('date', 1).add(1,'month'))
  })
   beforeEach(()=>{
    fixture = TestBed.createComponent(NgxNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onPrevMonth();
   })
   it('It should be prev month', ()=>{
     expect(component.currentPeriod.format('MM')).toEqual(moment().set('date', 1).add(-1,'month').format('MM'))
   })
   beforeEach(()=>{
    
    component.onToday();
   })
   it('it should be today', ()=>{
     expect(component.currentPeriod).toEqual(moment())
   })
});
