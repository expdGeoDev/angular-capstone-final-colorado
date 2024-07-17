import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { mockCoffee1, mockCoffee2, mockCoffeeArray, mockCoffeeArrayByRoaster } from '../mocks/mockCoffee';

describe('HttpService', () => {
	let service: HttpService;
	let httpController: HttpTestingController;
	const baseUrl = 'http://localhost:8100';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpService]
		});
		service = TestBed.inject(HttpService);
		httpController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should be created', () => {
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

	it('should call postCofee and the API should return the coffee that was added', () => {
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
});
