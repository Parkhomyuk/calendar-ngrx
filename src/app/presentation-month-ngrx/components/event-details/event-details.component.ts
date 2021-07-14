import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Renderer2 } from '@angular/core';
 
import { DetailsCoordinate } from '../event-board-day/event-board-day.component';

@Component({
  selector: 'co-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  animations: [
    trigger('openClose', [
       
      state('open', style({
        opacity: '100%',
        backgroundColor: 'red',  
        //transform: 'translateX(0)',
        
         
      })),
      state('closed', style({       
        width: '0px',
        opacity: '0%',
        backgroundColor: 'green', 
       // transform: 'translateX(-105%)',
      })),
      transition('open => closed', [
        animate('3s')
      ]),
      transition('closed => open', [
        animate('3s')
      ]),
    ]),
  ],
})
export class EventDetailsComponent implements OnInit, AfterViewInit {

@Output('detailStatus') detailsStatusWindow = new EventEmitter<boolean>();  
@Input() position: DetailsCoordinate= new DetailsCoordinate(0,0);
@Input() status: boolean=false;
  constructor(private renderer: Renderer2, private el: ElementRef) { }
 

  ngOnInit(): void {
   // console.log('positionDetail', this.position)
    this.renderer.setStyle(this.el.nativeElement.children[0], 'top', this.correctYPosition(this.position.y)+'px')
    this.renderer.setStyle(this.el.nativeElement.children[0], 'left',  this.correctXPosition(this.position.x)+'px')
     
    //  console.log('properties child', this.el.nativeElement.childNodes[0].offsetWidth)
    //  console.log('properties child', this.el.nativeElement.childNodes[0].offsetHeight)
     
  
  }
  ngAfterViewInit(): void {
    // console.log('position el', this.el.nativeElement.parentNode.offsetWidth)
    // console.log('position el window', window.innerWidth)
    // console.log('differ', window.innerWidth-this.el.nativeElement.parentNode.offsetWidth)
    
  }

  correctXPosition(x: number){   
      let differnceX=window.innerWidth-this.el.nativeElement.parentNode.offsetWidth;         
       if((differnceX+x)<this.el.nativeElement.childNodes[0].offsetWidth*1.90){
        
        return x+this.el.nativeElement.childNodes[0].offsetWidth*0.5
       }
      return x-this.el.nativeElement.childNodes[0].offsetWidth*1.05
  }
  
  correctYPosition(y: number){    
     
    let differnceY=window.innerHeight-this.el.nativeElement.childNodes[0].offsetHeight;   
    
     if((differnceY+y)<this.el.nativeElement.childNodes[0].offsetHeight*2.2  ){
      
      return y*1.05 
     }if(differnceY<y){
      return y-this.el.nativeElement.childNodes[0].offsetHeight
     }
      
     else{
      return y-this.el.nativeElement.childNodes[0].offsetHeight/2
     }    
}
  onCloseEventDetail(){
    console.log('close close');
    this.detailsStatusWindow.emit(true)
  }


}
