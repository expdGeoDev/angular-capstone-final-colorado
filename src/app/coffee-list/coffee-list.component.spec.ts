import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeListComponent } from './coffee-list.component';
import { HttpService } from '../service/http.service';
import { jsDocComment } from '@angular/compiler';
import { of } from 'rxjs';
import { mockCoffeeArray } from '../mocks/mockCoffee';

describe('CoffeeListComponent', () => {
	let component: CoffeeListComponent;
	let mockHttpService: any;
	let mockSpinnerService;
	let mockModalService;

	beforeEach(() => {
		mockHttpService = jasmine.createSpyObj(['getAllCoffee']);
		mockSpinnerService = jasmine.createSpyObj(['show', 'hide']);
		mockModalService = jasmine.createSpyObj(['close', 'open']);

		component = new CoffeeListComponent(mockHttpService, mockSpinnerService, mockModalService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get all coffees', () => {
		mockHttpService.getAllCoffee.and.returnValue(of(mockCoffeeArray));

		component.list = mockCoffeeArray;

		expect(component.list.length).toEqual(5);
	});
});
