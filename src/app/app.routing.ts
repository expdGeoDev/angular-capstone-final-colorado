import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { CoffeeFormComponent } from './coffee-form/coffee-form.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';

export const appRouting: Ng2StateDeclaration[] = [
	{
		name: 'home',
		url: '/home',
		component: HomeComponent,
	},
	{ name: 'coffeeForm', url: '/coffee', component: CoffeeFormComponent },
	// TODO: Add Routes to list coffees, add coffee and edit/delete coffee
	{
		name: 'coffeeList',
		url: '/coffee-list',
		component: CoffeeListComponent,
	},
];
