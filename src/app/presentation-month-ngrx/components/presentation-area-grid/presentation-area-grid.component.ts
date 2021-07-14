import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/header/store/reducers/sidebar.reducer';
import { selectSideBarStatus } from 'src/app/header/store/selectors/sidebar.selectors';

@Component({
  selector: 'col-presentation-area-grid',
  templateUrl: './presentation-area-grid.component.html',
  styleUrls: ['./presentation-area-grid.component.scss'],
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
 
export class PresentationAreaGridComponent implements OnInit {

  sideBarState$?: Observable<boolean>;
  weekGrid:TimeFormat[]=[];
  constructor(private store: Store<AppState>) {
    this.sideBarState$= store.pipe(select(selectSideBarStatus));
   }

  ngOnInit(): void {
    this.onInitGridTime();
  }

  onInitGridTime(){
    let startTime=1;
    for(let i=1;i<=24;i++){
      if(i===12){
        startTime=0;
      }
      if(i>11){
        
        this.weekGrid.push(new TimeFormat(startTime,'PM'))
      }else{
        this.weekGrid.push(new TimeFormat(startTime,'AM'))
      }
      startTime++;
    }
    this.weekGrid[11]=new TimeFormat(12,'PM');
  }

}
export class TimeFormat{
  time=0;
  half=''
  constructor(time: number, half: string){
    this.time=time;
    this.half=half;
  }
}