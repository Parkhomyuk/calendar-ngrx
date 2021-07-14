import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'col-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() iconName: string=''
  constructor() { }

  ngOnInit(): void {
  }

}
