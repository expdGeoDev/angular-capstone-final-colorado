import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeFormComponent } from './coffee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UIRouterModule } from '@uirouter/angular';
import { mockCoffee1, mockCoffee3, mockCoffeeArray } from '../mocks/mockCoffee';
import { of } from 'rxjs';
import { HttpService } from '../service/http.service';
import { CoffeeModel } from '../model/CoffeeModel';

describe('CoffeeFormComponent', () => {
	let component: CoffeeFormComponent;
	let fixture: ComponentFixture<CoffeeFormComponent>;
	let httpService: jasmine.SpyObj<HttpService>;

	beforeEach(async () => {
		httpService = jasmine.createSpyObj('HttpService', [
			'postCoffee',
			'getAllCoffee',
			'getCoffeeById',
		]);
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ToastrModule.forRoot(),
				UIRouterModule.forRoot(),
				CoffeeFormComponent,
			],
			providers: [{ provide: HttpService, useValue: httpService }],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeFormComponent);
		component = fixture.componentInstance;
		httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create the coffeeform', () => {
		component.ngOnInit();
		expect(component.coffeeForm).toBeTruthy();
	});

	it('should reset the coffeeForm', () => {
		component.resetForm();
		expect(component.coffeeForm.get('grind')?.value).toBe(0);
	});

	describe('Should return the correct string result for origin', () => {
		it('should return the string value of True', () => {
			let strValue = 'True';
			strValue = component.getSingleOrigin(true);
			expect(strValue).toBeTruthy();
		});

		it('should return the string value of False', () => {
			let strValue = 'False';
			strValue = component.getSingleOrigin(false);
			expect(strValue).toBeTruthy();
		});
	});

	describe('should return the correct string result', () => {
		it('should return a grid value Extra Coarse', () => {
			let strValue = 'Extra Coarse';

			strValue = component.getGrindLevel(1);
			expect(strValue).toBe('Extra Coarse');
		});

		it('should return a grid value Coarse', () => {
			let strValue = 'Coarse';

			strValue = component.getGrindLevel(2);
			expect(strValue).toBe('Coarse');
		});

		it('should return a grid value Medium-Coarse', () => {
			let strValue = 'Medium-Coarse';

			strValue = component.getGrindLevel(3);
			expect(strValue).toBe('Medium-Coarse');
		});

		it('should return a grid value Less Coarse More Medium', () => {
			let strValue = 'Less Coarse More Medium';

			strValue = component.getGrindLevel(4);
			expect(strValue).toBe('Less Coarse More Medium');
		});

		it('should return a grid value Medium', () => {
			let strValue = 'Medium';

			strValue = component.getGrindLevel(5);
			expect(strValue).toBe('Medium');
		});

		it('should return a grid value Refined Medium', () => {
			let strValue = 'Refined Medium';

			strValue = component.getGrindLevel(6);
			expect(strValue).toBe('Refined Medium');
		});
		it('should return a grid value More Refined Medium', () => {
			let strValue = 'More Refined Medium';

			strValue = component.getGrindLevel(7);
			expect(strValue).toBe('More Refined Medium');
		});

		it('should return a grid value Kind of Fine', () => {
			let strValue = 'Kind of Fine';

			strValue = component.getGrindLevel(8);
			expect(strValue).toBe('Kind of Fine');
		});

		it('should return a grid value Fine', () => {
			let strValue = 'Fine';

			strValue = component.getGrindLevel(9);
			expect(strValue).toBe('Fine');
		});

		it('should return a grid value Extra Fine', () => {
			let strValue = 'Extra Fine';

			strValue = component.getGrindLevel(10);
			expect(strValue).toBe('Extra Fine');
		});

		it('should return a grid value of empty string', () => {
			let strValue = '';
			strValue = component.getGrindLevel(11);
			expect(strValue).toBe('');
		});
	});

	it('should have roaster', () => {
		const roaster = component.coffeeForm.get('roaster');
		expect(roaster?.valid).toBeFalsy();
	});

	it('should create a new Coffee', () => {
		httpService.getAllCoffee.and.returnValue(of(mockCoffeeArray));
		let newCoffee = mockCoffee1;
		newCoffee.tastingNotes = 'COFFEE FROM TEST';
		component.coffeeForm.setValue(newCoffee);
		component.isEditCoffePage = false;

		component.onSubmit();

		expect(newCoffee.tastingNotes).toEqual('COFFEE FROM TEST');
	});

	it('should update a Coffee', () => {
		httpService.getAllCoffee.and.returnValue(of(mockCoffeeArray));
		let newCoffee = mockCoffee3;
		newCoffee.tastingNotes = 'COFFEE FROM TEST UPDATE';

		component.coffeeForm.setValue(newCoffee);
		component.isEditCoffePage = true;

		component.onSubmit();

		expect(newCoffee.tastingNotes).toEqual('COFFEE FROM TEST UPDATE');
	});

	it('should desable and reset form if ID field is empty', () => {
		httpService.getAllCoffee.and.returnValue(of(mockCoffeeArray));

		component.coffeeForm.get('id')?.setValue('');
		component.handleIdChanges();

		expect(component.coffeeForm.get('grind')?.value).toBe(0);
	});
});
