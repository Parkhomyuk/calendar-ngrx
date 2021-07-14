import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output,Input, EventEmitter, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/header/store/reducers/sidebar.reducer';
import { currentDateSelector } from 'src/app/header/store/selectors/sidebar.selectors';
 
import { DayOfWeekModel } from 'src/app/models/DayOfWeek.model';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';

@Component({
  selector: 'col-ngx-navigator',
  templateUrl: './ngx-navigator.component.html',
  styleUrls: ['./ngx-navigator.component.scss']
})
export class NgxNavigatorComponent implements OnInit , OnDestroy{
  public currentPeriod=moment();
  public arrayHeaderDaysOfWeek: DayOfWeekModel []=[];
  public arrayDaysOfCurrentMonth: Array<DaysOfMonth>[]=[];
  private subscribtion: Subscription= new Subscription();

  @Input('currentDateIn') curentDate?: DaysOfMonth;
  @Output() currentDateOut= new EventEmitter<DaysOfMonth>();
  constructor(private store: Store<AppState>) { }
 

  ngOnInit(): void {
      this. headerInit();
      this.initArrayOfNavigator();
     // this.currentDateOut.emit(new DaysOfMonth(moment().date(), moment().weekday()+1, moment().week(), moment().month()+1, moment().year()))
      this.currentDateOut.emit(new DaysOfMonth(moment().date(), moment().weekday(), moment().week(), moment().month(), moment().year()))
      
        
      this.subscribtion=this.store.pipe(select(currentDateSelector)).subscribe(data=> {
        this.currentPeriod=moment(`${data.currentDate.currentYear}-${data.currentDate.currentMonth+1}-${data.currentDate.dayOfMonth}`, 'YYYY-MM-DD') ;
        this. initArrayOfNavigator();
        
      })
  }

  public onNextMonth():void{
    this.currentPeriod=this.currentPeriod.set('date', 1).add(1,'month');
    
     
    this.initArrayOfNavigator()
  }
  public onPrevMonth(): void{
    this.currentPeriod=this.currentPeriod.set('date', 1).add(-1,'month');
    this.initArrayOfNavigator()    
  }
  public onToday(): void{
    this.currentPeriod=moment();
    this.initArrayOfNavigator();
    this.currentDateOut.emit(new DaysOfMonth(moment().date(), moment().weekday(), moment().week(), moment().month(), moment().year())) 
  }

  private headerInit(): void{
    for(let i=0;i<moment.weekdays().length;i++){
      this.arrayHeaderDaysOfWeek.push(new DayOfWeekModel(moment.weekdays()[i],moment.weekdays()[i].substring(0,1), i+1))
   }    
  }
  private initArrayOfNavigator(): void{
    for(let i=0;i<6;i++){
      this.arrayDaysOfCurrentMonth[i]=[]
      for(let j=0;j<7;j++){
        this.arrayDaysOfCurrentMonth[i][j]=new DaysOfMonth(0,0,0,0,0);
      }
    }
    this.fillCurrentMonthDays();
  }
  private fillCurrentMonthDays():void{
      const countDaysOfMonth=this.currentPeriod.daysInMonth();
      
      let arrayOfDays=this.arrayOfCurrentMonthDays(countDaysOfMonth);
       
      let count=0;
      let countWeek=arrayOfDays[0].weekOfYear;
     
      for(let i=0;i<arrayOfDays.length;i++){
        if(arrayOfDays[i].weekOfYear>countWeek ){
          countWeek=arrayOfDays[i].weekOfYear;
           
          count++;
        }
        this.arrayDaysOfCurrentMonth[count][arrayOfDays[i].dayOfWeek-1]= arrayOfDays[i];
        
      }
      //previose month arrayDaysOfCurrentMonth
      // let prevMonthDayCount=moment(`${this.currentPeriod.format('YYYY')}-${this.currentPeriod.month()}-${1}`).daysInMonth();
      let prevMonthDayCount=0;
      if(this.currentPeriod.month()===0){
         prevMonthDayCount=moment(`${this.currentPeriod.year()-1}-${12}-${1}`).daysInMonth();
      }
      else{
         prevMonthDayCount=moment(this.currentPeriod).subtract(1, 'months').daysInMonth();
      }
       
       
      for(let i=this.arrayDaysOfCurrentMonth[0].length-1;i>=0;i--){        
        if(this.arrayDaysOfCurrentMonth[0][i].dayOfMonth===0){     
          if(this.currentPeriod.month()===0){
            this.arrayDaysOfCurrentMonth[0][i]=new DaysOfMonth(prevMonthDayCount,i+1,(this.currentPeriod.week()),12, this.currentPeriod.year()-1);
          }
          else{
         this.arrayDaysOfCurrentMonth[0][i]=new DaysOfMonth(prevMonthDayCount,i+1,
          (moment(`${this.currentPeriod.year()}-${this.currentPeriod.month()}-${prevMonthDayCount}`, 'YYYY-MM-DD').week()),
          this.currentPeriod.month()-1, this.currentPeriod.year());
            
          }
          
          prevMonthDayCount--;
        }
      }
      //next month arrayOfCurrentMonth
      let nextMonthDayCount=1;
      for(let i=0;i<this.arrayDaysOfCurrentMonth[4].length;i++){        
        if(this.arrayDaysOfCurrentMonth[4][i].dayOfMonth===0){ 
          
          if(this.currentPeriod.month()===11){
           
            this.arrayDaysOfCurrentMonth[4][i]=new DaysOfMonth(nextMonthDayCount,i+1,
              (this.currentPeriod.week()),
              1, this.currentPeriod.year()+1);
             
          }else{
            this.arrayDaysOfCurrentMonth[4][i]=new DaysOfMonth(nextMonthDayCount,i+1,(this.currentPeriod.week()),this.currentPeriod.month()+1, this.currentPeriod.year());
          }        
          
          nextMonthDayCount++;
        }
      }
      for(let i=0;i<this.arrayDaysOfCurrentMonth[5].length;i++){        
        if(this.arrayDaysOfCurrentMonth[5][i].dayOfMonth===0){   
          if(this.currentPeriod.month()===11){
            
            this.arrayDaysOfCurrentMonth[5][i]=new DaysOfMonth(nextMonthDayCount,i+1,
              (moment(`${this.currentPeriod.year()+1}-${1}-${nextMonthDayCount}`, 'YYYY-MM-DD').week()),1, this.currentPeriod.year()+1);
             
          }
          else{
           
            
            this.arrayDaysOfCurrentMonth[5][i]=new DaysOfMonth(nextMonthDayCount,i+1,(moment(`${this.currentPeriod.year()}-${this.currentPeriod.month()+2}-${nextMonthDayCount}`, 'YYYY-MM-DD').week()), this.currentPeriod.month()+1, this.currentPeriod.year());
          }      
          
          nextMonthDayCount++;
        }
      }
  }
  private arrayOfCurrentMonthDays(days:number):DaysOfMonth[]{
    const arrayDays=[]  
    for(let i=1;i<=days;i++){
       if(moment(this.currentPeriod.set('date', i)).week()===1 && moment(this.currentPeriod).month()===11){
         
        arrayDays.push(new DaysOfMonth(i, moment(`${this.currentPeriod.format('YYYY')}-${this.currentPeriod.format('MM')}-${i}`).day()+1, 53 , moment(this.currentPeriod).month(), moment(this.currentPeriod).year()))
       }
        arrayDays.push(new DaysOfMonth(i, moment(`${this.currentPeriod.format('YYYY')}-${this.currentPeriod.format('MM')}-${i}`).day()+1, moment(this.currentPeriod.set('date', i)).week() , moment(this.currentPeriod).month(), moment(this.currentPeriod).year()))
                                //  dayOfMonth:number, dayOfWeek: number, weekOfYear: number, currentMonth: number, currentYear: number)
                                
      }
      return arrayDays
  }
  public getActiveMonth(date: DaysOfMonth){
    
    return moment(this.currentPeriod).format('MM')===moment(`${date.currentYear}-${date.currentMonth+1}-${date.dayOfMonth}`).format('MM')&&moment(this.currentPeriod).format('YYYY')===moment(`${date.currentYear}-${date.currentMonth+1}-${date.dayOfMonth}`).format('YYYY')
  }
  getCurrentDateOfMonth(day:DaysOfMonth){
    
      
    return `${moment().year()}-${moment().month()}-${moment().date()}`=== `${day.currentYear}-${day.currentMonth}-${day.dayOfMonth}`;
  }
  onClickDay(day: DaysOfMonth){
    
    
    // let curDay=day;
    // curDay.currentMonth=curDay.currentMonth+1;
    // curDay.currentMonth=curDay.dayOfWeek+1;
    //  this.currentDateOut.emit(curDay);
    // if((day.currentMonth)>this.currentPeriod.month() && day.currentYear===this.currentPeriod.year()){
    //   this.currentPeriod=moment(this.currentPeriod).add(1,'month').set('date',1)
    //   this.initArrayOfNavigator()
    //   console.log('month>month year===year', this.currentPeriod)
    //   console.log('month curren', this.currentPeriod.month());
    //   console.log('getted month', day.currentMonth);
    //  this.fillCurrentMonthDays();
    // }if(day.currentMonth<this.currentPeriod.month() && day.currentYear===this.currentPeriod.year()){
    //   console.log('month<month year===year', this.currentPeriod);
      
    //   this.currentPeriod.set('day',1).add(-1,'month');
    //   this.initArrayOfNavigator()
    //  this.fillCurrentMonthDays();
    // }
    // if(day.currentMonth>this.currentPeriod.month() && day.currentYear!=this.currentPeriod.year()){
    //   this.currentPeriod=moment(this.currentPeriod).set('month',11).set('date',1).set('year', this.currentPeriod.year()-1)
       
    //   this.initArrayOfNavigator()
    //  console.log('month>month year!=year', this.currentPeriod)
    //  this.fillCurrentMonthDays();
    // }
    // if(day.currentMonth<this.currentPeriod.month() && day.currentYear!=this.currentPeriod.year()){
    //   console.log('month<month year!=year', this.currentPeriod)
    //   this.currentPeriod=moment(this.currentPeriod).set('date',1).set('month',0).set('year', this.currentPeriod.year()+1);
    //   this.initArrayOfNavigator()
    //  this.fillCurrentMonthDays();
    // }
      if((day.currentMonth===this.currentPeriod.month())&&(day.currentYear===this.currentPeriod.year())){
        this.currentPeriod=this.currentPeriod.set('date', day.dayOfMonth);
        this.initArrayOfNavigator();
        this.fillCurrentMonthDays();
        this.currentDateOut.emit(new DaysOfMonth(day.dayOfMonth,day.dayOfWeek,
        day.weekOfYear, this.currentPeriod.month(), this.currentPeriod.year())) 
      }
      if((day.currentMonth<this.currentPeriod.month())&&(day.currentYear===this.currentPeriod.year())){                
        this.currentPeriod=this.currentPeriod.set('month',this.currentPeriod.month()-1).set('date', 1);
        this.initArrayOfNavigator();
        this.fillCurrentMonthDays();
        this.currentDateOut.emit(new DaysOfMonth(day.dayOfMonth,day.dayOfWeek,
          day.weekOfYear, this.currentPeriod.month(), this.currentPeriod.year())) 
      }
      if((day.currentMonth>this.currentPeriod.month())&&(day.currentYear===this.currentPeriod.year())){                
        this.currentPeriod=this.currentPeriod.set('month',this.currentPeriod.month()+1).set('date', 1);
        this.initArrayOfNavigator();
        this.fillCurrentMonthDays();
        this.currentDateOut.emit(new DaysOfMonth(day.dayOfMonth,day.dayOfWeek,
          day.weekOfYear, this.currentPeriod.month(), this.currentPeriod.year())) 
      }
      if((day.currentMonth>this.currentPeriod.month())&&(day.currentYear<this.currentPeriod.year())){   
                   
        this.currentPeriod=moment(`${this.currentPeriod.year()-1}-${12}-${day.dayOfMonth}`,'YYYY-MM-DD');
         
        this.initArrayOfNavigator();
        this.fillCurrentMonthDays();
        this.currentDateOut.emit(new DaysOfMonth(day.dayOfMonth,day.dayOfWeek,
          day.weekOfYear, this.currentPeriod.month(), this.currentPeriod.year())) 
      }
      if((day.currentMonth<this.currentPeriod.month())&&(day.currentYear>this.currentPeriod.year())){   
                   
        // this.currentPeriod=moment(`${this.currentPeriod.year()+1}-${1}-${1}`,'YYYY-MM-DD');
        this.currentPeriod=moment().set('month',0).set('date', day.dayOfMonth).set('year', day.currentYear);
         
        this.initArrayOfNavigator();
        this.fillCurrentMonthDays();
        this.currentDateOut.emit(new DaysOfMonth(day.dayOfMonth,day.dayOfWeek,
          day.weekOfYear, this.currentPeriod.month(), this.currentPeriod.year())) 
      }
     
     
  }
  getHoliday(day: DaysOfMonth){
    if((day.dayOfWeek===1 || day.dayOfWeek===7) && day.currentMonth===this.currentPeriod.month()){
      return true
    }else{
      return false
    }
  }
  ngOnDestroy(): void {
   this.subscribtion.unsubscribe()
  }

}
