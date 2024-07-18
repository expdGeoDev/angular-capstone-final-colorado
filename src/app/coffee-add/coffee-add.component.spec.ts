import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeAddComponent } from './coffee-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UIRouterModule } from '@uirouter/angular';

describe('CoffeeAddComponent', () => {
	let component: CoffeeAddComponent;
	let fixture: ComponentFixture<CoffeeAddComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), UIRouterModule.forRoot(), CoffeeAddComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
