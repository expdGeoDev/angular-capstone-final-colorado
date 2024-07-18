import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeEditDelete } from './coffee-edit-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UIRouterModule } from '@uirouter/angular';

describe('CoffeeEditDelete', () => {
	let component: CoffeeEditDelete;
	let fixture: ComponentFixture<CoffeeEditDelete>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), UIRouterModule.forRoot(), CoffeeEditDelete],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeEditDelete);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
