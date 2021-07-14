import { Component, OnInit , Input, HostListener, Renderer2, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'col-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  contentItem: ElementRef | undefined;
  width:any='';
 @ViewChild('toolContent') set toolContent(v: ElementRef){if(v){ 
   this.contentItem=v; 
   
   this.width= v.nativeElement.offsetWidth;
   this.renderer.setStyle(v.nativeElement,'left',((this.width/2-2)*-1)+'px')
    
  }} 
 @Input('message') message: string='';
 @HostListener('mouseover',['$event'])
  onMosueOver(event: MouseEvent){
     
     
        
       
     
    this.isOpen=true;
  }
  @HostListener('mouseleave',['$event'])
  onMosueLeave(event: MouseEvent){
     
    this.isOpen=false;
  }

 isOpen: boolean=false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

}
