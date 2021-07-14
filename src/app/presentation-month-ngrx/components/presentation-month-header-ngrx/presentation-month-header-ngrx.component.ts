import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AppState } from 'src/app/header/store/reducers/sidebar.reducer';
import { selectCurrentDate, selectSideBarStatus } from 'src/app/header/store/selectors/sidebar.selectors';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';

@Component({
  selector: 'col-presentation-month-header-ngrx',
  templateUrl: './presentation-month-header-ngrx.component.html',
  styleUrls: ['./presentation-month-header-ngrx.component.scss'],
  animations: [
    trigger('openClose', [
       
      state('open', style({
        marginLeft: '220px',
        width: '88vw'
        
         
      })),
      state('closed', style({       
        width: '100vw',
        marginLeft: '0px',
         
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ],
})
export class PresentationMonthHeaderNgrxComponent implements OnInit, OnDestroy {
  statusSideBar$?: Observable<boolean>;
  currentDate$?: Observable<DaysOfMonth>;
  currentWeek: DaysOfMonth[]=[];
  subscription: Subscription= new Subscription();
 
  @ViewChild('wrapperCon') wrapper:ElementRef | undefined; 
  constructor(private store: Store<AppState>, private renderer: Renderer2, private el:ElementRef) { 
    this.statusSideBar$= store.pipe(select(selectSideBarStatus));
    this.currentDate$= store.pipe(select(selectCurrentDate));
  }
  

  ngOnInit(): void {
         
    let currentDay=moment()
    this.subscription!=this.currentDate$?.subscribe(data=>{
      
      currentDay=moment(`${data.currentYear}-${data.currentMonth+1}-${data.dayOfMonth}`,'YYYY-MM_DD');
      const FDay=moment(`${data.currentYear}-${data.currentMonth+1}-${data.dayOfMonth}`,'YYYY-MM_DD').day(0);
      let curWeek=0; 
      console.log('data.weekOfYear', data.weekOfYear)
      console.log('FDay.week()', FDay.week())
      
      if(this.currentWeek.length===0  || curWeek!=data.weekOfYear  ){
        curWeek=FDay.week()
        this.currentWeek=[];
        for(let i=0;i<7;i++){
          const tamper=moment(`${data.currentYear}-${data.currentMonth+1}-${data.dayOfMonth}`,'YYYY-MM_DD').day(i);
          this.currentWeek.push(
            new DaysOfMonth(
              tamper.date(), 
              i,
              tamper.week(), 
              tamper.month(),
              tamper.year())
              )
               
               
        }
        
      }
       
       
    }) 
   
  }
  getDayOfWeek(day: DaysOfMonth){
      return moment(`${day.currentYear}-${day.currentMonth+1}-${day.dayOfMonth}`,'YYYY-MM_DD').format('ddd')
  }
  onCurrentDate(day:DaysOfMonth){
    
    return day.dayOfMonth===moment().date() && day.currentMonth===moment().month() && day.currentYear===moment().year();
  }
  ngAfterViewInit() {
    
    
     
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
