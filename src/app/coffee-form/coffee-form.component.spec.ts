import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeFormComponent } from './coffee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UIRouterModule } from '@uirouter/angular';

describe('CoffeeFormComponent', () => {
	let component: CoffeeFormComponent;
	let fixture: ComponentFixture<CoffeeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ToastrModule.forRoot(),
				UIRouterModule.forRoot(),
				CoffeeFormComponent,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeFormComponent);
		component = fixture.componentInstance;
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
});
