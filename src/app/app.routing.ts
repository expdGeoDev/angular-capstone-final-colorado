import { Ng2StateDeclaration } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeAddComponent } from './coffee-add/coffee-add.component';

import { CoffeeEditDelete } from './coffee-edit-delete/coffee-edit-delete.component';

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
	{ name: 'coffeeEditDelete', url: '/edit-delete-coffee', component: CoffeeEditDelete },
];
