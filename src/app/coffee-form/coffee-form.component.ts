import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-coffee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './coffee-form.component.html',
  styleUrl: './coffee-form.component.css'
})
export class CoffeeFormComponent {
	grindValue = 1;
	constructor(private fb: FormBuilder) {

	}

	ngOnInit(): void {
		this.coffeeForm = this.fb.group({
			roaster: ['', Validators.required],
			groundOrBeans: ['Bean'],
			roast: ['Light'],
			singleOrigin: [false],
			grindLevel: [1],
			flavorNotes: [''],
		});
	}

	get roaster() {
		return this.coffeeForm.get('roaster');
	}

	getGrindLevel(value: number): string {
		switch (value) {
			case 1:
				return 'Coarse';
			case 2:
				return 'Medium-Coarse';
			case 3:
				return 'Medium';
			case 4:
				return 'Fine';
			case 5:
				return 'Extra Fine'
			default:
				return 'Unknown';
		}
	}

	getSingleOrigin(value: boolean): string {
		if (value){
			return "True";
		} else {
			return "False";
		}
	}

	onSubmit(){
		console.log('submitted')
	}
	coffeeForm!: FormGroup;
}
