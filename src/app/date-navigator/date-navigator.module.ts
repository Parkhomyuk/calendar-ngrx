import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateNavigatorComponent } from './components/date-navigator/date-navigator.component';
import {MatIconModule} from '@angular/material/icon';
import { TooltipModule } from 'src/app/shared/tooltip/tooltip/tooltip.module';

@NgModule({
  declarations: [
    DateNavigatorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TooltipModule
  ],
  exports:[ DateNavigatorComponent]
})
export class DateNavigatorModule { }
