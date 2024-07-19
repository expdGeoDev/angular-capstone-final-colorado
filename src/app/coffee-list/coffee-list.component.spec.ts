import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeListComponent } from './coffee-list.component';
import { HttpService } from '../service/http.service';
import { jsDocComment } from '@angular/compiler';
import { of } from 'rxjs';
import { mockCoffee1, mockCoffeeArray } from '../mocks/mockCoffee';

describe('CoffeeListComponent', () => {
	let component: CoffeeListComponent;
	let mockHttpService: any;
	let mockSpinnerService;
	let mockModalService;

	beforeEach(() => {
		mockHttpService = jasmine.createSpyObj(['getAllCoffee', 'putCoffee']);
		mockSpinnerService = jasmine.createSpyObj(['show', 'hide']);
		mockModalService = jasmine.createSpyObj(['close', 'open']);

		component = new CoffeeListComponent(mockHttpService, mockSpinnerService, mockModalService);

		mockHttpService.getAllCoffee.and.returnValue(of(mockCoffeeArray));
		component.list = mockCoffeeArray;
	});

	afterEach(() => {
		// Clean up or reset the state if needed
		mockHttpService.getAllCoffee.calls.reset();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return no values', () => {
		component.roast = 'No Values';
		component.searchText = 'To Return';
		component.applySearch();

		expect(component.filteredList.length).toEqual(0);
	});

	it('should return values', () => {
		component.roast = 'dark';
		component.searchText = 'Eight';
		component.applySearch();

		expect(component.filteredList.length).toEqual(1);
	});

	it('should return that search has invalid terms ',() =>{
		component.searchText = 'not-valid';
		component.applySearch();
		expect(component.isValid).toEqual(false);
	});


	it('should sort coffee by roaster asc ',() =>{
		component.filteredList = mockCoffeeArray;
		component.sortOrder = 'desc';
		component.sortTable('roaster');
		expect(component.filteredList[0].roaster).toEqual("Eight O'Clock");
	});

	// it('should show coffee details modal',() =>{
	//
	// });


	it('should sort coffee by roaster desc',() =>{
		component.filteredList = mockCoffeeArray;
		component.sortOrder = 'asc';
		component.sortTable('roaster');
		expect(component.filteredList[0].roaster).toEqual("Tim Horton's");
	});

	it('should mark coffee as inactive and no details shown',() =>{
		mockHttpService.putCoffee.and.returnValue(of(mockCoffeeArray))
		component.onDelete(mockCoffee1);
		expect(component.list.find(coffee => coffee.id == 1)?.active).toEqual(false);
		expect(component.filteredList.length).toEqual(1);
	});



});
