import { Component, OnInit, Input,Output, AfterViewInit, EventEmitter } from '@angular/core';
 

@Component({
  selector: 'cal-dropdown-row',
  templateUrl: './dropdown-row.component.html',
  styleUrls: ['./dropdown-row.component.scss']
})
export class DropdownRowComponent implements OnInit, AfterViewInit {
  @Input() props: {id: 0,name:'', default: any, mark:''}={id:0, name:'', default: false, mark:''};
  @Output() activateRow = new EventEmitter<number>();
   title: string='title';
   mark: string='mark' 
  constructor() { }
  ngAfterViewInit(): void {
    
    
    
  }

  ngOnInit(): void {
   
    this.title= this.props.name;
  }

  onActivate(){
    
    this.activateRow.emit(this.props.id)
  }


}
