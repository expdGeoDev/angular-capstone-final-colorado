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
	inputValue: string ='';

	constructor(
		private fb: FormBuilder,
		private coffeeService: HttpService,
		private toaster: ToastrService
	) {
		this.roastType = Object.values(RoastType);
		this.sizeType = Object.values(SizeType).filter((value) => isNumber(value));
	}

	ngOnInit(): void {
		this.coffeeForm = this.fb.group({
			id: [1],
			active: [true],
			roaster: ['', Validators.required],
			variety: [null],
			size: [0],
			roast: ['Light', Validators.required],
			format: [''],
			grind: [0],
			origin: [null],
			singleOrigin: [false],
			tastingNotes: [''],
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
				return 'Kinda of Fine';
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

	async onSubmit(coffee: CoffeeModel) {
		this.isLoading = true;
		console.log(coffee);
		this.coffeeService.postCoffee(coffee).subscribe( coffee=> {
			console.log(coffee)
			this.toaster.success('Coffee save Successfully','Success',{ closeButton: true});
			this.isLoading = false;
			this.resetForm();
		});

	}

	resetForm(){
		this.coffeeForm.reset()
		this.coffeeForm.get("grind")?.setValue(0);
	}

	onKeyUp():void{
	console.log('test');
	const id= this.coffeeForm.get('id')?.value
	console.log(id);
	this.coffeeService.getCoffeeById(id).subscribe( coffee=>{
		console.log(coffee)
		//console.log(JSON.stringify(coffee));
		const cofeedata = JSON.stringify(coffee);
		this.coffeeForm.setValue(coffee)
		//this.coffeeForm.get("grind")?.setValue(coffee["grind"]);

	}, error =>  {
		this.toaster.warning('Coffee Id is not found','Warning',{ closeButton: true});
		});

	}
}
