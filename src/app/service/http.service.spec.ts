import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import {
	mockCoffee1,
	mockCoffee2,
	mockCoffeeArray,
	mockCoffeeArrayByRoaster,
} from '../mocks/mockCoffee';
import { CoffeeModel, RoastType, SizeType } from '../model/CoffeeModel';

describe('HttpService', () => {
	let service: HttpService;
	let httpController: HttpTestingController;
	const baseUrl = 'http://localhost:8100';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpService],
		});
		service = TestBed.inject(HttpService);
		httpController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should create', () => {
		expect(service).toBeTruthy();
	});

	it('should call getAllCoffees and return an array of coffees', () => {
		service.getAllCoffee().subscribe((res) => {
			expect(res).toEqual(mockCoffeeArray);
		});

		const req = httpController.expectOne({
			method: 'GET',
			url: `${baseUrl}/coffees`,
		});

		req.flush(mockCoffeeArray);
	});

	it('should call getCoffeeById and return the appropriate Coffee', () => {
		const id = 1;

		service.getCoffeeById(id).subscribe((data) => {
			expect(data).toEqual(mockCoffee1);
		});

		const req = httpController.expectOne({
			method: 'GET',
			url: `${baseUrl}/coffees/${id}`,
		});

		req.flush(mockCoffee1);
	});

	it('should call postCoffee and the API should return the coffee that was added', () => {
		service.postCoffee(mockCoffee2).subscribe((data) => {
			expect(data).toEqual(mockCoffee2);
		});

		const req = httpController.expectOne({
			method: 'POST',
			url: `${baseUrl}/coffees`,
		});

		req.flush(mockCoffee2);
	});

	it('should call getCoffeeByField and return the appropriate Coffee', () => {
		const field = 'roaster';
		const value = 'Paper Plane';

		service.getCoffeeByField(field, value).subscribe((data) => {
			expect(data).toEqual(mockCoffeeArrayByRoaster);
		});

		const req = httpController.expectOne({
			method: 'GET',
			url: `${baseUrl}/coffees/?${field}=${value}`,
		});

		req.flush(mockCoffeeArrayByRoaster);
	});

	it('should call putCoffee and return the updated coffee from the API', () => {
		const updatedCoffee: CoffeeModel = {
			id: 1,
			active: false,
			roaster: "Tim Horton's",
			variety: '',
			size: 14,
			roast: RoastType.DARK,
			format: 'k-pod',
			grind: SizeType.TWENTYFOUR,
			origin: [''],
			singleOrigin: true,
			tastingNotes: '',
		};

		service.putCoffee(mockCoffee1).subscribe((data) => {
			expect(data).toEqual(updatedCoffee);
		});

		const req = httpController.expectOne({
			method: 'PUT',
			url: `${baseUrl}/coffees/${updatedCoffee.id}`,
		});

		req.flush(updatedCoffee);
	});
});
