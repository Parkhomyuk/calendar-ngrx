export class DayOfMonthModel{
    
    private fullTime: moment.Moment;
    constructor(fullTime: moment.Moment ){
      
      this.fullTime=fullTime;
    }
    getFullDate(){
        return this.fullTime;
    }
    setFullDate(day:moment.Moment){
        this.fullTime=day;
    }
  }