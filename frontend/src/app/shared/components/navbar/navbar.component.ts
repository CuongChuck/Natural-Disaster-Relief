import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private static instance: NavbarComponent | null = null

  tags: NavItem[] = [
    { name: 'Home', link: 'home', active: true, children: []},
    { name: 'Reports', link: 'reports', active: true, children: [
      { name: 'Daily', link: 'daily', active: true, children: []},
      { name: 'Monthly', link: 'monthly', active: true, children: []},
    ]},
  ];

  @ViewChild('menu') menu!: ElementRef

  constructor(private renderer: Renderer2) {
    if (NavbarComponent.instance) {
      throw new Error('NavbarComponent already exists')
    }
    NavbarComponent.instance = this
  }

  ngOnInit(): void {
    
  }

  // addMenuItems(item: NavItem, link: string = ''): HTMLDivElement {
  //   const div = this.renderer.createElement('div')
  //   if (item.children.length) {
      
  //   console.log('lllllllll: ', item.children)
  //     const ul = this.renderer.createElement('div')
  //     item.children.forEach(ele => {
  //       const li = this.addMenuItems(ele)
  //       ul.insertAdjacentHTML('beforeend', li.innerHTML)
  //     })
  //     div.innerHTML = `
  //       <li class="nav-item">
  //         <a 
  //           class="nav-link text-black px-3 py-2 d-flex justify-content-between align-items-center"
  //           data-bs-toggle="collapse" 
  //           href="#reportsMenu" 
  //           role="button"
  //           aria-expanded="false" 
  //           aria-controls="${item.name}Menu"
  //         >
  //           ${item.name}
  //           <i class="bi bi-caret-down-fill small"></i>
  //         </a>

  //         <ul class="collapse ps-4" id="${item.name}Menu">
  //           ${ul.innerHTML}
  //         </ul>
  //       </li>
  //     `
  //   }
  //   else {
  //     div.innerHTML = `
  //       <li class="nav-item">
  //         <a routerLink="/${ link != '' ? link + '/' + item.link : item.link }" 
  //            routerLinkActive="${item.active}"
  //            class="nav-link text-black px-3 py-2"
  //         >
  //           ${item.name}
  //         </a>
  //       </li>
  //     `
  //   }
  //   console.log('\n' + div.innerHTML + '\n')
  //   return div
  // }

  ngAfterViewInit(): void {
    // const ul = this.renderer.createElement('ul')
    // this.renderer.addClass(ul, 'nav')
    // this.renderer.addClass(ul, 'flex-column')
    // this.tags.forEach(ele => {
    //   const li = this.addMenuItems(ele)
    //   ul.insertAdjacentHTML('beforeend', li.innerHTML)
    // });
    // this.renderer.setProperty(this.menu.nativeElement, 'innerHTML', ul.innerHTML);
  }

  ngOnDestroy(): void {
    NavbarComponent.instance = null;
  }
};

export interface NavItem {
  name: string;
  link: string;
  active: boolean;
  children: NavItem[];
};