import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cal-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonTitle: string='';

  constructor() { }

  ngOnInit(): void {
  }

}
