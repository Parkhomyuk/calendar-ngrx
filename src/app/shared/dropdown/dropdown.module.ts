import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownRowComponent } from './dropdown-row/dropdown-row.component';



@NgModule({
  declarations: [
    DropdownComponent,
    DropdownRowComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DropdownComponent]
})
export class DropdownModule { }
