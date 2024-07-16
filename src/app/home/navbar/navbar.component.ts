import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [UIRouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
