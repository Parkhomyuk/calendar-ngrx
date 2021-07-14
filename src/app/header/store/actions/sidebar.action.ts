import { createAction, props } from "@ngrx/store";
import { DaysOfMonth } from "src/app/models/DaysOfMont.model";
import { ActionTypes } from "../actionTypes";
import { SideBarInterface } from "../types/sideBar.interface";




export const sidebarActionOpen= createAction(
    ActionTypes. SIDEBAR_CLOSE
     
)

export const sideBarActionClose= createAction(
    ActionTypes.SIDEBAR_OPEN
)

export const currentDateAction= createAction(
    ActionTypes.CURRENT_DATE,
    props<{currentDate: DaysOfMonth}>()
)