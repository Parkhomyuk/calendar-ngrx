import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TimeModel } from 'src/app/models/Time.model';

@Component({
  selector: 'col-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  currentTime: TimeModel= new TimeModel('','','');
  timeSlot:any[]=[{title:12, trnsform: 90, left:0}, {title:3, trnsform: 180,  left:50}, {title:6, trnsform: 270, left:100}, {title:9, trnsform: 360, left:50}];
  constructor() { }

  ngOnInit(): void {
    this.currentTime=new TimeModel(moment().format('hh'),moment().format('mm'), moment().format('A'));
    console.log('this.currentTime', this.currentTime)
  }

}
