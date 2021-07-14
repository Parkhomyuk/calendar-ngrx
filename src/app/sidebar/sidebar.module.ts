import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxNavigatorModule } from '../ngx-navigator/ngx-navigator.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NgxNavigatorModule,
  ],
  exports:[SidebarComponent]
})
export class SidebarModule { }
