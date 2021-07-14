import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { IconButtonModule } from '../shared/icon-button/icon-button.module';
import {MatIconModule} from '@angular/material/icon';
import {TooltipComponent} from 'src/app/shared/tooltip/tooltip/tooltip.component';   
import { TooltipModule } from 'src/app/shared/tooltip/tooltip/tooltip.module';
@NgModule({
  declarations: [
    MainNavigatorComponent,
  ],
  imports: [
    CommonModule,
    IconButtonModule,
    MatIconModule,
    TooltipModule  
     
  ], 
  exports:[ MainNavigatorComponent]
})
export class NavigatorModule { }
