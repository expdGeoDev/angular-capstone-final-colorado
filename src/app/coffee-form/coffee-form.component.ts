import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HttpService} from '../service/http.service';
import {CoffeeModel} from '../model/CoffeeModel';

@Component({
  selector: 'app-coffee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './coffee-form.component.html',
  styleUrl: './coffee-form.component.css'
})
export class CoffeeFormComponent {
	grindValue = 1;
	coffeeForm!: FormGroup;
	constructor(private fb: FormBuilder, private coffeeService: HttpService) {}



	ngOnInit(): void {
		this.coffeeForm = this.fb.group({
			coffeeId: [1],
			active: [true],
			roaster: ['', Validators.required],
			variety: [null],
			size: [8],
			roast: ['Light', Validators.required],
			groundOrBeans: ['Bean'],
			grind: [1],
			origin: [null],
			singleOrigin: [false],
			tastingNotes: ['']
		});
	}

	get roaster() {
		return this.coffeeForm.get('roaster');
	}

// TODO: Needs to Range up to 10
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
		console.log(this.coffeeForm.value)
	}

}
