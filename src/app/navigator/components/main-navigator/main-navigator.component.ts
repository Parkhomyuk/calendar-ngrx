import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
 

@Component({
  selector: 'col-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit {
  @Input() iconSize: any=48;
  @Output() currentDateOut = new EventEmitter<string>()
  dayToday:number=0;
  monthTodayName: string='';
  yearTodayName: string='';
  arrayOfDays: any []=[];
  arrayOfDaysNew: DayModel []=[];
  arrayOfDaysOfMonth: DayOfMonthModel []=[];
  arrayOfWeekNew: DayOfWeekModel []=[];
  currentMonth: any='';
  currentYear: any='';
  ArWeeksOfMont=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
  ArrayWeeksOfMont=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
  constructor() {

   }

  ngOnInit(): void {
   
    this.currentMonth=moment().month();
    this.currentYear=moment().year();
    
     
    this.getArrayOfDays();
     
    this.monthTodayName=moment().format('MMMM');
    this.yearTodayName=moment().format('YYYY');
    if(this.currentMonth){
      this.dayToday=Number(moment().format('DD'));
    }

    this.currentDateOut.emit(moment().format('YYYY-MM-DD'));
    
  }
    getArrayOfDays(){
      let month=moment().month();
      let year=moment().year();
      let currentPeriod='';
      if(month>9){
        currentPeriod=`${year}-${month+1}`
      }else{
        currentPeriod=`${year}-0${month+1}`
      }
      let weekArray = moment.weekdaysShort();
       for(let i=0;i<moment.weekdays().length;i++){
          this.arrayOfWeekNew.push(new DayOfWeekModel(moment.weekdays()[i],moment.weekdays()[i].substring(0,1), i+1))
       }
       
      let ddd=moment(currentPeriod,"YYYY-MM").daysInMonth()
      
     this.arrayOfDays= Array.from(Array(moment(currentPeriod,"YYYY-MM").daysInMonth()).keys());
     for(let i=0;i<ddd;i++){
       let monthDay=i+1;
       let trap='';
       if(monthDay>9){
          trap=`${this.currentYear}-${this.currentMonth+1}-${monthDay}`
       }else{
        trap=`${this.currentYear}-${this.currentMonth+1}-0${monthDay}`
       }
       const date=moment(trap);
        
       const dow=date.day()+1;
       const dayMoment=moment(`${this.currentYear}/${this.currentMonth+1}/${monthDay}`, 'YYYY/MM/DD');
       
       this.arrayOfDaysNew.push(new DayModel(monthDay, dow, moment(`${this.currentYear}-${this.currentMonth+1}-${monthDay}`,"YYYY-MM-DD" ).week(),moment(`${this.currentYear}/${this.currentMonth+1}/${monthDay}`, 'YYYY/MM/DD')))
     }
     //todo
     
      
     let tamp:number=this.arrayOfDaysNew[0].WeekNumber;
     let count=0;
     
      
     for(let i=0;i<this.arrayOfDaysNew.length;i++){
            if(this.arrayOfDaysNew[i].WeekNumber>tamp){
              tamp=this.arrayOfDaysNew[i].WeekNumber;
              count++;
            }
            this.ArWeeksOfMont[count][this.arrayOfDaysNew[i].dayOfWeek-1]=this.arrayOfDaysNew[i].dayOfMonth;

             
     }
     let countDayOfMonth=(moment().month(this.currentMonth-1).daysInMonth());
     let firstdayNextMonth=1;
     for(let i=this.ArWeeksOfMont[0].length;i>=0;i--){
        

       
     
       if(this.ArWeeksOfMont[0][i]===0){
        this.ArWeeksOfMont[0][i]=countDayOfMonth;
        countDayOfMonth--;
       }
     }
     for(let i=0;i<this.ArWeeksOfMont[5].length;i++){
      

        
      if(this.ArWeeksOfMont[5][i]===0){
       this.ArWeeksOfMont[5][i]=firstdayNextMonth;
       firstdayNextMonth++;
      }
    }


    }

    onGetSelectedDay(day: any){
      
      return day;
    }
    onDisplayDayOfMonth(day: moment.Moment){
      return 
    }
    onNextMonth(){
     
      this.ArWeeksOfMont=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
      this.currentMonth++;
      this.getArrayOfDays();
    }
}

class DayModel{
  public dayOfMonth: any;
  public dayOfWeek: any;
  public WeekNumber: any;
  public fullTime: moment.Moment;
  constructor(dayOfMonth: any, dayOfWeek: any, WeekNumber: any, fullTime: moment.Moment ){
    this.dayOfMonth=dayOfMonth;
    this.dayOfWeek=dayOfWeek;
    this.WeekNumber=WeekNumber;
    this.fullTime=fullTime;
  }
}
class DayOfMonthModel{
   
  public fullTime: moment.Moment;
  constructor( fullTime: moment.Moment ){
     
    this.fullTime=fullTime;
  }
}
class DayOfWeekModel{
  public dayName: string;
  public dayNameShort: string;
  public dayNumber: number;
  constructor(dayName:string, dayNameShort: string, dayNumber: number ){
    this.dayName=dayName;
    this.dayNumber=dayNumber;
    this.dayNameShort=dayNameShort;
  }
}