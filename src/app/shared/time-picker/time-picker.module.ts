import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker/time-picker.component';



@NgModule({
  declarations: [
    TimePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[TimePickerComponent]
})
export class TimePickerModule { }
