export class DayOfWeekModel{
    public dayName: string;
    public dayNameShort: string;
    public dayNumber: number;
  constructor(dayName:string, dayNameShort: string, dayNumber: number ){
    this.dayName=dayName;
    this.dayNumber=dayNumber;
    this.dayNameShort=dayNameShort;
  }
}