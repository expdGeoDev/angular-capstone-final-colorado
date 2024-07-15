import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { CoffeeFormComponent } from './coffee-form/coffee-form.component';

export const appRouting: Ng2StateDeclaration[] = [
	{
		name: 'Home',
		url: '/home',
		component: HomeComponent,
	},
	{ name: 'coffee-form', url: '/coffee', component: CoffeeFormComponent },
	// TODO: Add Routes to list coffees, add coffee and edit/delete coffee
];
