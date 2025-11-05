import { Component, Input } from '@angular/core';
import { NavItem } from '../navbar.component';

@Component({
  selector: 'dropdown-list-item',
  templateUrl: './dropdown-list-item.component.html',
  styleUrl: './dropdown-list-item.component.css'
})
export class DropdownListItemComponent {
  @Input() itemList: NavItem[] = []
  @Input() name: string = ''
  @Input() baseLink: string = ''
  @Input() active: boolean = true

  isExpanded: boolean = false
}
