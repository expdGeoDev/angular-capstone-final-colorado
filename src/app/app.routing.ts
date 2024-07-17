import { Ng2StateDeclaration, Transition } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { CoffeeFormComponent } from './coffee-form/coffee-form.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeAddComponent } from './coffee-add/coffee-add.component';

export const appRouting: Ng2StateDeclaration[] = [
	{
		name: 'home',
		url: '/home',
		component: HomeComponent,
	},
	{ name: 'coffeeForm', url: '/coffee-add', component: CoffeeAddComponent },
	{
		name: 'coffeeList',
		url: '/coffee-list',
		component: CoffeeListComponent,
	},
];
