export class DaysOfMonth{
    public dayOfWeek:number=0;
    public dayOfMonth:number=0;
    public weekOfYear:number=0;
    public currentYear: number=0;
    public currentMonth: number=0;
    constructor(dayOfMonth:number, dayOfWeek: number, weekOfYear: number, currentMonth: number, currentYear: number){
        this.dayOfWeek=dayOfWeek;
        this.dayOfMonth=dayOfMonth;
        this.weekOfYear=weekOfYear;
        this.currentMonth=currentMonth;
        this.currentYear=currentYear;
    }
}