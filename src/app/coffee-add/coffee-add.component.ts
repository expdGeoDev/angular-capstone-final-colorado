import { Component } from '@angular/core';
import { CoffeeFormComponent } from '../coffee-form/coffee-form.component';

@Component({
	selector: 'app-coffee-add',
	standalone: true,
	imports: [CoffeeFormComponent],
	templateUrl: './coffee-add.component.html',
	styleUrl: './coffee-add.component.css',
})
export class CoffeeAddComponent {}
