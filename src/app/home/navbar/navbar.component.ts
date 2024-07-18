import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [UIRouterModule, NgOptimizedImage],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
