import { state } from '@angular/animations';
import {Action, createReducer, on, props} from '@ngrx/store';
import * as moment from 'moment';
import { DaysOfMonth } from 'src/app/models/DaysOfMont.model';
import { sidebarActionOpen,sideBarActionClose, currentDateAction } from '../actions/sidebar.action';
import { SideBarInterface } from '../types/sideBar.interface';
 
export interface AppState {
    currentDate: DaysOfMonth;
    
    status: boolean;
  }
 export const initionalState: AppState={status: true, currentDate: new DaysOfMonth(moment().date(), moment().weekday()+1, moment().week(), moment().month()+1, moment().year())};

 const _sideBarReducer= createReducer(
     initionalState,
     on(sidebarActionOpen, (state)=>({...state, status: true})),
     on(sideBarActionClose, (state)=>({...state, status: false})),
     on(currentDateAction, (state,props)=>({...state, currentDate: props.currentDate}))
 )


 export function slideBarReducer(state: AppState| undefined, action: Action){
     return _sideBarReducer(state, action);
 }