import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  
} from '@angular/animations';

@Component({
  selector: 'cal-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations:[
    trigger('openClose',[
      state('open',style({
        height: 'auto',
        opacity: 1,
         
      })),
      state('close',style({
        height: '1px',
        width: 0,
        opacity: 0.1,
      })),
      transition('*=>open',[
        animate('2s')
      ])
    ])
  ]
})
export class DropdownComponent implements OnInit {


  @Input() titleButtonOut: Array<any>=[];
  currentArrayRows: Array<any>=[]
  iconHeight:string= '12px';
  buttonTitle: string='';
  openContent: boolean=false;
  directionDropdown: ElementRef|undefined
  @ViewChild('dropdown') set dropdown(v: ElementRef){if(v){ this.directionDropdown=v; console.log('v', v)}}

  @HostListener('document:click', ['$event'])
    onMouseDown(e: MouseEvent){
      console.log('element ref', this.el.nativeElement.offsetWidth);
      console.log('window', window.innerWidth);
      
      
      if(this.el.nativeElement.contains(e.target) ){
        console.log('dropdown', this.directionDropdown?.nativeElement.offsetWidth);
        if((this.el.nativeElement.offsetLeft+this.directionDropdown?.nativeElement.offsetWidth)>window.innerWidth){
          console.log('warrning');
          
          if(this.directionDropdown){
            console.log('dropdown11', this.directionDropdown.nativeElement);
            console.log('dropdown22', this.directionDropdown.nativeElement.offsetWidth);
             let width=this.directionDropdown.nativeElement.offsetWidth*-1+this.el.nativeElement.offsetWidth;
             console.log('dropdown33', width);
            this.renderer.setStyle(this.directionDropdown.nativeElement,'left', width+'px')
          }
         
        }
      }else{
        this.openContent=false;
      }
     
    }
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

     
    this.onActiveTitle();
  }

  onActiveTitle(){
    this.titleButtonOut.forEach(item=>{
      if(item.default===true){
        this.buttonTitle=item.name
      }
    })
    this.titleButtonOut.forEach(item=>{
      if(item.default===false){
        this.currentArrayRows.push(item)
      }
    })
     
  }

  onActivateRow(event: number){
     
    this.titleButtonOut.forEach(item=>{
      item.default=false;
    })
    this.titleButtonOut.forEach(item=>{
      if(item.id===event){
        item.default=true;
      }
    })
    this.currentArrayRows=[];

    this.onActiveTitle();
    this.onOpenMenu();
  }

  onOpenMenu(){
    this.openContent=!this.openContent;
  }

}
