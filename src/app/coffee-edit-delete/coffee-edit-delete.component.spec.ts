import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeEditDelete } from './coffee-edit-delete.component';

describe('CoffeeEditDelete', () => {
	let component: CoffeeEditDelete;
	let fixture: ComponentFixture<CoffeeEditDelete>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CoffeeEditDelete],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeEditDelete);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
