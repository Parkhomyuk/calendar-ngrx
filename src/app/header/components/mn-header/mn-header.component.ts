import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Store,select } from '@ngrx/store';
import {Observable, of, Subscriber, Subscription, SubscriptionLike} from 'rxjs';
import * as moment from 'moment';
 
import { SideBarInterface } from '../../store/types/sideBar.interface';
import { AppState } from '../../store/reducers/sidebar.reducer';
import { selectCurrentDate, selectSideBarStatus } from '../../store/selectors/sidebar.selectors';
import { sidebarActionOpen, sideBarActionClose, currentDateAction } from '../../store/actions/sidebar.action';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';
 
@Component({
  selector: 'col-mn-header',
  templateUrl: './mn-header.component.html',
  styleUrls: ['./mn-header.component.scss']
})
export class MnHeaderComponent implements OnInit {
  dateIcon: string='../../../../assets/icons/123.png'
  status$!: Observable<boolean>;
  currentDate$!: Observable<DaysOfMonth>;
  status: boolean=true;
  dateSelected?: DaysOfMonth=new DaysOfMonth(0,0,0,0,0);
  subscription: Subscription= new Subscription();
  subscriptionDate: Subscription= new Subscription();
  constructor(private store: Store<AppState>) { 
     this.status$=store.pipe(select(selectSideBarStatus));
     this.currentDate$=this.store.pipe(select(selectCurrentDate));
  }

  ngOnInit(): void {
    this.dateIcon=`../../../../assets/icons/${moment().date()}.png`;
    
    this.initializeValues();
     
  }

  initializeValues(): void {
    this.subscription= this.status$.subscribe(
      data=>{
        console.log('status subscribe', data)
        this.status=data;
      }
    )
    this.subscriptionDate= this.currentDate$.subscribe(
      date=>{
        this.dateSelected=date;
         
      }
    )
     
  }

  onSidebar():void{
   if(this.status===true){
     console.log('changes status', this.status)
     this.store.dispatch(sideBarActionClose())
   }else{
    this.store.dispatch(sidebarActionOpen())
   }
    
  }
  onOpenedBar(){
    
  }
  getFullMonthName(date: DaysOfMonth){
    return moment(`${date.currentYear}-${date.currentMonth+1}-${date.dayOfMonth}`, 'YYYY-MM-DD').format('MMMM')
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  today(){
    this.store.dispatch(currentDateAction({currentDate: new DaysOfMonth(moment().date(), moment().weekday(), moment().week(), moment().month(), moment().year())})); 
                                                   
  }
  onPreviousWeek(){
   // const date=moment(`${this.dateSelected?.currentYear}-${this.dateSelected?.currentMonth}-${this.dateSelected?.dayOfMonth}`, 'YYYY-MM-DD').set('week',Number(this.dateSelected?.weekOfYear)-1 );
    const date=moment(`${this.dateSelected?.currentYear}-${Number(this.dateSelected?.currentMonth)+1}-${this.dateSelected?.dayOfMonth}`, 'YYYY-MM-DD').add(-1,'weeks' );

     
    this.store.dispatch(currentDateAction({currentDate:new DaysOfMonth(date.date(), date.day(), date.week(), date.month(), date.year())}))
  }
  onNextWeek(){
    const date=moment(`${this.dateSelected?.currentYear}-${Number(this.dateSelected?.currentMonth)+1}-${this.dateSelected?.dayOfMonth}`, 'YYYY-MM-DD').add(1,'weeks' );

     
    this.store.dispatch(currentDateAction({currentDate:new DaysOfMonth(date.date(), date.day(), date.week(), date.month(), date.year())}))
  }
}
