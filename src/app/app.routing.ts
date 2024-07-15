import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';

export const appRouting: Ng2StateDeclaration[] = [
	{
		name: 'Home',
		url: '/home',
		component: HomeComponent,
	},
	// TODO: Add Routes to list coffees, add coffee and edit/delete coffee
];
