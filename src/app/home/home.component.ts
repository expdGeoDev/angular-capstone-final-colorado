import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { UIRouterModule } from '@uirouter/angular';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [NavbarComponent, UIRouterModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent {
	onClick(action: string): void {
		// TODO: Redirect to the corresponding page
		console.log(action);
	}
}
