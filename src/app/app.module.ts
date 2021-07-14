import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DropdownModule } from 'src/app/shared/dropdown/dropdown.module'; 
import {ButtonModule } from 'src/app/shared/button/button.module'; 
import {IconButtonModule } from 'src/app/shared/icon-button/icon-button.module'; 
import { NavigatorModule } from './navigator/navigator.module';
import { DateNavigatorModule } from './date-navigator/date-navigator.module';
import { NgxNavigatorModule } from './ngx-navigator/ngx-navigator.module';
import { HeaderModule } from './header/header.module';
import { TimePickerModule } from './shared/time-picker/time-picker.module';
import { StoreModule } from '@ngrx/store';
 
import { SidebarModule } from './sidebar/sidebar.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { slideBarReducer } from './header/store/reducers/sidebar.reducer';
import { PresentationMonthNgrxModule } from './presentation-month-ngrx/presentation-month-ngrx.module';
 
 
 

@NgModule({
  declarations: [
    AppComponent,    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    DropdownModule,
    ButtonModule,
    IconButtonModule,
    NavigatorModule, 
    DateNavigatorModule,
    NgxNavigatorModule,
    HeaderModule,
    TimePickerModule,
    SidebarModule,
    PresentationMonthNgrxModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreModule.forRoot({status: slideBarReducer})
    
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
