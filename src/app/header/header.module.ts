import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MnHeaderComponent } from './components/mn-header/mn-header.component';
import {MatIconModule} from '@angular/material/icon';
import {StoreModule} from '@ngrx/store'
 

@NgModule({
  declarations: [
    MnHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
     
  ],
  exports:[MnHeaderComponent]
})
export class HeaderModule { }
