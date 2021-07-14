import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-ngrx';
  titleArr: any[]=[{id:1,name:'Day', default: false, mark:'D'}, {id:2,name:'Week', default: true, mark:'W'}, {id:3,name:'Month', default: false, mark:'M'}, {id:4,name:'Year', default: false, mark:'Y'}, {id:5, name:'Schedule', default: false, mark:'A'}, { id:6,name:'4 days', default: false, mark:'X'}]
}
