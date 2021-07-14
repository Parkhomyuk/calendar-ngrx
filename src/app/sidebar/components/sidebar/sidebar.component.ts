import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { AppState } from 'src/app/header/store/reducers/sidebar.reducer';
import { selectCurrentDate, selectSideBarStatus } from 'src/app/header/store/selectors/sidebar.selectors';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
 
import { SideBarInterface } from 'src/app/header/store/types/sideBar.interface';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';
import { currentDateAction } from 'src/app/header/store/actions/sidebar.action';

@Component({
  selector: 'col-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
       
      state('open', style({
        width: '12vw',
        left:'0', 
        transform: 'translateX(0)',
        
         
      })),
      state('closed', style({       
         
         
        transform: 'translateX(-105%)',
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
export class SidebarComponent implements OnInit {
  status$?: Observable<boolean>;
  currentDate$?: Observable<DaysOfMonth>
  subscription: SubscriptionLike= new Subscription();
  currentDay:DaysOfMonth= new DaysOfMonth(0, 0, 0, 0, 0);
  constructor(private store:Store<AppState>) { 
   this.status$=store.pipe(select(selectSideBarStatus));
   this.currentDate$=store.pipe(select(selectCurrentDate))
  }

  ngOnInit(): void {
     
  }
  initializeValues(): void {
     
  }
  ngOnDestroy() {
    
  }
  getCurrentDate(e: DaysOfMonth){
     
    this.currentDay=e;
    this.store.dispatch(currentDateAction({currentDate: e}))
  }

}
