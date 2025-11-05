import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
  animations: [
    trigger('rotate', [
      state('shown', style({ transform: 'rotate(90deg)' })),
      state('hidden', style({ transform: 'rotate(0deg)' })),
      transition('shown <=> hidden', animate('300ms ease-out'))
    ])
  ]
})
export class NavItemComponent {
  @Input() name: string = ''
  @Input() baseLink: string = ''
  @Input() link: string = ''
  @Input() active: boolean = true
  @Input() dropdown: boolean = false
  @Input() isExpanded: boolean = false
}
