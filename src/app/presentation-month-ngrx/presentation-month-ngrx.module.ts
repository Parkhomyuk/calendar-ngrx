import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationMonthNgrxComponent } from './components/presentation-month-ngrx/presentation-month-ngrx.component';
import { PresentationMonthHeaderNgrxComponent } from './components/presentation-month-header-ngrx/presentation-month-header-ngrx.component';
import { PresentationAreaGridComponent } from './components/presentation-area-grid/presentation-area-grid.component';
import { EventBoardDayComponent } from './components/event-board-day/event-board-day.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    PresentationMonthNgrxComponent,
    PresentationMonthHeaderNgrxComponent,
    PresentationAreaGridComponent,
    EventBoardDayComponent,
    EventDetailsComponent,
     
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DragDropModule
  ],
  exports:[PresentationMonthNgrxComponent]
})
export class PresentationMonthNgrxModule { }
