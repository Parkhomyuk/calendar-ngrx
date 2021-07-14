import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../reducers/sidebar.reducer";

 

 export const openedSelector = createFeatureSelector<AppState>('status');
 export const currentDateSelector = createFeatureSelector<AppState>('status');

 export const selectSideBarStatus= createSelector(
     openedSelector,
     (state)=>state.status
 )

 export const selectCurrentDate = createSelector(
     currentDateSelector,
     (state)=>state.currentDate
 )