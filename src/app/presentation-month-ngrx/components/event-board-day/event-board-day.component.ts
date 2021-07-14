import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit, Input, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit, OnDestroy, AfterViewChecked, ComponentFactoryResolver, ViewContainerRef, ComponentRef, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/header/store/reducers/sidebar.reducer';
import { currentDateSelector, selectCurrentDate, selectSideBarStatus } from 'src/app/header/store/selectors/sidebar.selectors';
import * as moment from 'moment';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { NodeJSFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
 
 
@Component({
  selector: 'co-event-board-day',
  templateUrl: './event-board-day.component.html',
  styleUrls: ['./event-board-day.component.scss'],
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
export class EventBoardDayComponent implements OnInit,  OnDestroy, AfterViewInit, AfterViewChecked {
  @Input() data!: string;
  sideBarState$?: Observable<boolean>;
  currentDate$: Observable<DaysOfMonth>
  closeFromChildButtom: boolean= false
  currentTime=moment();
  currentFullTime!:DaysOfMonth;
  eventDetailsOpened: boolean=false;
  position: DetailsCoordinate=new DetailsCoordinate(0,0);
  private subscribtion: Subscription= new Subscription();
  intervalInit: any;
  currentWeekArray: DayDasboard[]=[];
  newEventSection: any;
  @ViewChild('line') line?: ElementRef;
  @ViewChild('line2',{read: ViewContainerRef}) line2: any;
  @ViewChild('detail' ) detail: any;
   
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent){
    console.log('this.newEventSection', this.newEventSection)
   
    if(this.newEventSection  ){
      console.log('this.newEventSection is exist', this.newEventSection)
      console.log('this.detail', this.detail)
       
      if((  !this.detail.el.nativeElement.contains(event.target) )|| this.closeFromChildButtom===true ){
          this.closeEventDetail();
         
      }
      
    } else{
   console.log('opyat', event)
   
    this.eventDetailsOpened=true; 
    this.closeFromChildButtom=false;
   
    let divWrapper=this.renderer.createElement('div');
    let divTitle=this.renderer.createElement('div');
    let divTime=this.renderer.createElement('div');
    this.renderer.addClass(divTitle,'event-title');
    this.renderer.addClass(divTime,'event-time');
    this.renderer.addClass(divWrapper,'events-wrapper');
    const text=this.renderer.createText('Hi a new div');
    this.renderer.appendChild(divTitle,text );
      
    const textTime=this.renderer.createText(`${moment().set('hour',Math.floor(event.offsetY/40)).set('minutes', 0).format('hh:mm')}${' '}
    -${' '}${moment().set('hour',Math.floor(event.offsetY/40)+1).set('minutes', 0).format('hh:mm')}${' '}${this.detectCurrentPeridPart(event.offsetY, 40)}`);
    this.renderer.appendChild(divTime,textTime )
    this.newEventSection =this.renderer.createElement('div');
    this.renderer.appendChild(this.newEventSection, divWrapper);
    this.renderer.appendChild(divWrapper, divTitle);
    this.renderer.appendChild(divWrapper, divTime);
    this.renderer.appendChild(this.newEventSection, divWrapper);
    
    
    this.renderer.addClass(this.newEventSection, 'event');
    this.renderer.setStyle(this.newEventSection, 'top',this.newEventCorrectPosition(event.offsetY)*40 +'px');
    this.renderer.setAttribute(this.newEventSection, 'id','temporery', )
    this.renderer.appendChild(event.target, this.newEventSection );
    this.position.y=event.y
    this.position.x=event.x-event.offsetX;
     
     
  }
  }
   
  constructor(private store: Store<AppState>, private renderer: Renderer2, private el: ElementRef, private componentFactoryResolver: ComponentFactoryResolver) {
    this.sideBarState$= store.pipe(select(selectSideBarStatus));
    this.currentDate$=this.store.pipe(select(selectCurrentDate));
   }
  
  

  ngOnInit(): void {
     
    this.subscribtion=this.currentDate$.subscribe(
      date=>{
        this.currentFullTime=date;
        this.currentTime=moment(`${date.currentYear}-${date.currentMonth}-${date.dayOfMonth}`, 'YYYY-MM-DD');
       
          this.onGetCurrentWeekArray(date);  
          if(this.newEventSection){
            this.closeEventDetail();
          }
         
          //this.closeFromChildButtom=true;
          
       
        if(this.line){
          
          this.onSetCurrentTime()
        }
      }
    )
    this.onCurrentTime();
  }
  onDetect(item: DayDasboard){
    console.log('item', item)
  }
  onCurrentTime(){   

    return this.currentTime.format('hh:mm:ss a')
  }
  getCurrentTime(){

  }

  ngAfterViewInit(): void {
     
     
      this.onSetCurrentTime();
      this.intervalInit=setInterval(()=>{
        this.onSetCurrentTime();
      }, 30000)
    
    
       
  }
  ngAfterViewChecked(): void {
      
     this.onSetCurrentTime();
  }

  onSetCurrentTime(){
     
     
    let curentMin=moment().format('mm');
    let curentHour=0;
     
    let stateTime=40/60;
     
    if(moment().format('a')==='pm'){
      curentHour=Number(moment().format('hh'))+12;
    }else{
      curentHour=Number(moment().format('hh'));
    }
    if(this.line){
      
      this.renderer.setStyle(this.line?.nativeElement,'top', (curentHour*40)+(stateTime*Number(curentMin))+'px');
    }
      
    
  
    return true;
  }
  onGetCurrentWeekArray(_dateCur: DaysOfMonth){
     
     
      for(let i=0;i<7;i++){
        this.currentWeekArray[i]=new DayDasboard(_dateCur.weekOfYear, i, moment().week());
      }
       
      
  }
  detecCurrentDay(item: DayDasboard){
    
    return moment().day()===item.dayNumber && moment().week()===item.weekNumber;
  }

   private newEventCorrectPosition(position: number){
      let correction=position/40;
      return Math.floor(correction);
   } 

   detectCurrentPeridPart(item: number, step: number){
      if(item>(step*12)){
        return 'pm'
      }else{
        return 'am'
      }
   }
   
   closeEventDetail(){
    this.renderer.removeChild(this.el.nativeElement, this.newEventSection)     
    this.eventDetailsOpened=false;
    this.newEventSection=undefined;
   }
   closeFromChild(e: any){
     console.log('parent close');
     this.closeFromChildButtom=e;
      
   }

  ngOnDestroy(): void {
    if(this.intervalInit){
      clearInterval (this.intervalInit);
    }
  }



 

}

export class DayDasboard{
  public weekNumber: number=0;
  public dayNumber: number=0;
  public weekCurrent: number=0;
  constructor(weekNumber: number, dayNumber: number, weekCurrent:number){
    this.weekNumber=weekNumber;
    this.dayNumber=dayNumber;
    this.weekCurrent=weekCurrent;
  }

}

export class DetailsCoordinate{
  public x: number=0;
  public y: number=0;
  constructor(x: number, y: number){
    this.x=x;
    this.y=y;
  }
}
 