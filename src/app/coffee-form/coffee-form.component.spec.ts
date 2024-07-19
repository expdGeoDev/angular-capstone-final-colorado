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

	// TODO: How Do we parameterize test
	it('should return a grid value', () => {
		let strValue = 'Extra Fine';

		strValue = component.getGrindLevel(10);
		expect(strValue).toBe('Extra Fine');
	});

	it('should have roaster', () => {
		const roaster = component.coffeeForm.get('roaster');
		expect(roaster?.valid).toBeFalsy();
	});
});
