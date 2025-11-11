import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavbarModule
  ],
  templateUrl: "./app.component.html",
  styles: ''
})
export class AppComponent {};
