import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNavigatorComponent } from './components/ngx-navigator/ngx-navigator.component';
import { TooltipModule } from 'src/app/shared/tooltip/tooltip/tooltip.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    NgxNavigatorComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    MatIconModule
  ],
   exports:[NgxNavigatorComponent]
})
export class NgxNavigatorModule { }
