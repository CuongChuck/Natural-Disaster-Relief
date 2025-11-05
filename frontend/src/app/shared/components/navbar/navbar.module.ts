import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { DropdownListItemComponent } from './dropdown-list-item/dropdown-list-item.component';
import { NavItemComponent } from './nav-item/nav-item.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DropdownListItemComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
