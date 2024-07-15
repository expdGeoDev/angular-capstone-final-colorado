import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UIRouterModule } from '@uirouter/angular';
import { NavbarComponent } from './home/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	imports: [HomeComponent, UIRouterModule, NavbarComponent],
})
export class AppComponent {
	title = 'angular-capstone';
}
