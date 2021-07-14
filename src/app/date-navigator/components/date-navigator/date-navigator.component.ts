import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DayOfMonthModel} from 'src/app/models/DayOfMonth.model'; 
import {DayOfWeekModel} from 'src/app/models/DayOfWeek.model'; 

@Component({
  selector: 'col-date-navigator',
  templateUrl: './date-navigator.component.html',
  styleUrls: ['./date-navigator.component.scss']
})
export class DateNavigatorComponent implements OnInit {
  currentDate: moment.Moment=moment();
  dayModel: DayOfMonthModel | undefined;
  arrayMultiDaysOfMonth: any[]=[];
  arrayDaysOfMonth: any[]=[];
  arrayDaysOfWeek: DayOfWeekModel []=[];
  constructor() { }

  ngOnInit(): void {
    this.currentDate=moment();
    this.dayModel=new DayOfMonthModel(this.currentDate);
    this.onInitMatrixNavigator();  
    this.onInitHeaderNavigator();
    this.fillMatrixNavigator();
        
  }

  onInitMatrixNavigator(){
    for(let i=0;i<6;i++){
      const arrayItems=[];
      for(let i=0;i<7;i++){
          arrayItems.push(moment('1000-01-01',"YYYY-MM-DD"));
      }
      this.arrayMultiDaysOfMonth.push(arrayItems);
       
    }
  }
  onInitHeaderNavigator(){
     for(let i=0;i<moment.weekdays().length;i++){
        this.arrayDaysOfWeek.push(new DayOfWeekModel(moment.weekdays()[i],moment.weekdays()[i].substring(0,1), i+1))
     }    
  }
  fillMatrixNavigator(){
    if(this.currentDate){
      let month=this.currentDate.month();
      let year=this.currentDate.year();    
      let currentPeriod='';
    if(month>9){
      currentPeriod=`${year}-${month+1}`
    }else{
      currentPeriod=`${year}-0${month+1}`
    }
    let dayInCurrentMonth=moment(currentPeriod,"YYYY-MM").daysInMonth();
    console.log('count of days current',dayInCurrentMonth )
    for(let i=0;i<dayInCurrentMonth;i++){
      let monthDay=i+1;
      let formatDay='';
      if(monthDay>9){
        formatDay=`${year}-${month+1}-${monthDay}`
      }else{
        formatDay=`${year}-${month}-0${monthDay}`
      }
        
       
       this.arrayDaysOfMonth.push(moment(currentPeriod+'-'+(i+1),"YYYY-MM-DD"));
         
       let count=0;
       let tamp=this.arrayDaysOfMonth[0].week();
       for(let i=0;i<this.arrayDaysOfMonth.length;i++){
        if(this.arrayDaysOfMonth[i].week()>tamp){
          tamp=this.arrayDaysOfMonth[i].week();
          count++;
        }
       
        this.arrayMultiDaysOfMonth[count][this.arrayDaysOfMonth[i].weekday()]=this.arrayDaysOfMonth[i];

         
 }






       this.getDate(this.arrayDaysOfMonth[i])
      }
      
      let countDayOfMonth=(moment().month(this.currentDate.month()-1).daysInMonth());
      
      let firstdayNextMonth=1;
      for(let i=this.arrayMultiDaysOfMonth[0].length;i>=0;i--){
                 
        if(moment(this.arrayMultiDaysOfMonth[0][i]).year()===1000){
          this.arrayMultiDaysOfMonth[0][i]=moment(`${moment().year()}-${moment().month()-1}-${countDayOfMonth}`,"YYYY-MM-DD");
         countDayOfMonth--;
        }
      }

      // array.includes(moment('1000-01-01','YYYY-MM-DD'))
      for(let i=0;i<this.arrayMultiDaysOfMonth.length;i++){
        for(let j=0;j<this.arrayMultiDaysOfMonth[i].length;j++){
          // console.log('includes', moment(this.arrayMultiDaysOfMonth[i][j]).year()===1000);
          if(moment(this.arrayMultiDaysOfMonth[i][j]).year()===1000){
             
          }
         
        }
      }
      for(let i=0;i<this.arrayMultiDaysOfMonth[5].length;i++){       
      
       if(moment(this.arrayMultiDaysOfMonth[5][i]).year()===1000){
        this.arrayMultiDaysOfMonth[5][i]=moment(`${moment().year()}-${moment().month()+2}-${firstdayNextMonth}`,"YYYY-MM-DD");
        firstdayNextMonth++;
       }
     }
    }
  }
  getDate(day: moment.Moment){
     
    return day.format('DD');
  }
  onClickDay(day: moment.Moment){
   
    return day;
  }
  getCurrentDateOfMonth(day: moment.Moment){
    let date= moment().format('DD');
    let month= moment().format('MM');
    let year= moment().format('YYYY');
    let date2= moment(day).format('DD');
    let month2= moment(day).format('MM');
    let year2= moment(day).format('YYYY');
     
    return `${year}-${month}-${date}`=== `${year2}-${month2}-${date2}`;
  }
  getActiveMonth(date: moment.Moment){
    
    return moment().format('MM')===date.format('MM')
  }
  getFullDate(day: moment.Moment){
    return `${day.year()}/${day.month()+1}/${day.daysInMonth}`
  }
  getCurrentMonth(){
    return moment(this.currentDate ).format('MMMM');
  }
  getCurrentYear(){
    return moment(this.currentDate,'YYYY').year();
  }
  onNextMonth(){
    // this.currentDate=moment(`${this.currentDate.year()}/${this.currentDate.month()+2}/01`,"YYYY/MM/DD");
    let date= moment().format('DD');
    let month= moment().format('MM');
    let year= moment().format('YYYY');
    let date2= moment('2021-05-26').format('DD');
    let month2= moment('2021-05-26').format('MM');
    let year2= moment('2021-05-26').format('YYYY');
     
    
    let curMonth=Number(moment().format('MM'));
    
    this.currentDate=moment().set('date', 1); 
    this.currentDate=moment().set('month',curMonth+1 )
    this.arrayMultiDaysOfMonth =[];
    this.arrayDaysOfMonth =[];
    this.onInitMatrixNavigator();
    this.fillMatrixNavigator();
  }


}
