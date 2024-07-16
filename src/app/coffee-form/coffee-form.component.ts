import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpService } from '../service/http.service';
import { CoffeeModel, RoastType, SizeType } from '../model/CoffeeModel';
import { isNumber, values } from '@uirouter/angular';

//const roastKeys: string[] = [];

@Component({
	selector: 'app-coffee-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
	templateUrl: './coffee-form.component.html',
	styleUrl: './coffee-form.component.css',
})
export class CoffeeFormComponent {
	grindValue = 1;
	coffeeForm!: FormGroup;
	roastType: string[];
	sizeType: (string | SizeType)[];

	constructor(
		private fb: FormBuilder,
		private coffeeService: HttpService
	) {
		this.roastType = Object.values(RoastType);
		this.sizeType = Object.values(SizeType).filter((value) => isNumber(value));
	}

	ngOnInit(): void {
		console.log(this.sizeType);
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
			tastingNotes: [''],
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
				return 'Extra Fine';
			default:
				return 'Unknown';
		}
	}

	getSingleOrigin(value: boolean): string {
		if (value) {
			return 'True';
		} else {
			return 'False';
		}
	}

	onSubmit() {
		console.log(this.coffeeForm.value);
	}
}
