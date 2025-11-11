import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '',
        children: [
          { path: '', component: HomeComponent, title: 'Natural Disaster Relief' },
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  constructor(private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // window.scroll(0, 0);
      }
    })
  }
};
