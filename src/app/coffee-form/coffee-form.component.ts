import { Component, Input } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { StateService } from '@uirouter/angular';

@Component({
	selector: 'app-coffee-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
	templateUrl: './coffee-form.component.html',
	styleUrl: './coffee-form.component.css',
})
export class CoffeeFormComponent {
	@Input()
	isEditCoffePage: boolean = false;
	isLoading: boolean = false;
	grindValue = 1;
	coffeeForm!: FormGroup;
	roastType: string[];
	sizeType: (string | SizeType)[];
	inputValue: string = '';

	constructor(
		private fb: FormBuilder,
		private coffeeService: HttpService,
		private toaster: ToastrService,
		private stateService: StateService
	) {
		this.roastType = Object.values(RoastType);
		this.sizeType = Object.values(SizeType).filter((value) => isNumber(value));
	}

	ngOnInit(): void {
		this.coffeeForm = this.fb.group({
			id: [''],
			active: [{ value: true, disabled: this.isEditCoffePage }],
			roaster: [{ value: '', disabled: this.isEditCoffePage }, Validators.required],
			variety: [{ value: null, disabled: this.isEditCoffePage }],
			size: [{ value: 0, disabled: this.isEditCoffePage }],
			roast: [{ value: 'Light', disabled: this.isEditCoffePage }, Validators.required],
			format: [{ value: '', disabled: this.isEditCoffePage }],
			grind: [{ value: 0, disabled: this.isEditCoffePage }],
			origin: [{ value: null, disabled: this.isEditCoffePage }],
			singleOrigin: [{ value: false, disabled: this.isEditCoffePage }],
			tastingNotes: [{ value: '', disabled: this.isEditCoffePage }],
		});
	}

	get roaster() {
		return this.coffeeForm.get('roaster');
	}

	getGrindLevel(value: number): string {
		switch (value) {
			case 1:
				return 'Extra Coarse';
			case 2:
				return 'Coarse';
			case 3:
				return 'Medium-Coarse';
			case 4:
				return 'Less Coarse More Medium';
			case 5:
				return 'Medium';
			case 6:
				return 'Refined Medium';
			case 7:
				return 'More Refined Medium';
			case 8:
				return 'Kind of Fine';
			case 9:
				return 'Fine';
			case 10:
				return 'Extra Fine';
			default:
				return '';
		}
	}

	getSingleOrigin(value: boolean): string {
		if (value) {
			return 'True';
		} else {
			return 'False';
		}
	}

	async onSubmit() {
		if (this.isEditCoffePage) {
			const coffee: CoffeeModel = this.coffeeForm.value;
			this.coffeeService.putCoffee(coffee).subscribe((response) => {
				console.log(response);
				this.toaster.success(`Coffee ${coffee.roaster} updated Successfully`, 'Success', {
					closeButton: true,
				});
				this.resetForm();
				this.stateService.go('coffeeList');
			});
		} else {
			const coffee = this.coffeeForm.value;
			delete coffee.id;
			this.coffeeService.postCoffee(coffee).subscribe((response) => {
				console.log(response);
				this.toaster.success('Coffee save Successfully', 'Success', { closeButton: true });
				this.resetForm();
				this.stateService.go('coffeeList');
			});
		}
	}

	handleIdChanges() {
		if (this.coffeeForm.get('id')?.value === '') {
			this.coffeeForm.disable();
			this.coffeeForm.get('id')?.enable();
			this.resetForm();
		}
	}

	resetForm() {
		this.coffeeForm.reset();
		this.coffeeForm.get('grind')?.setValue(0);
	}

	onKeyUp(): void {
		const id = this.coffeeForm.get('id')?.value;
		this.coffeeService.getCoffeeById(id).subscribe(
			(coffee) => {
				this.coffeeForm.setValue(coffee);
				this.coffeeForm.enable();
			},
			(error) => {
				this.toaster.warning('Coffee Id is not found', 'Warning', { closeButton: true });
			}
		);
	}
}
