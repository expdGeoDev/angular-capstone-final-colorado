import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoffeeModel } from '../model/CoffeeModel';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	baseUrl = 'http://localhost:8100';

	constructor(private client: HttpClient) {}

	getAllCoffee(): Observable<CoffeeModel[]> {
		return this.client.get<CoffeeModel[]>(`${this.baseUrl}/coffees`);
	}

	getCoffeeById(id: number): Observable<CoffeeModel> {
		return this.client.get<CoffeeModel>(`${this.baseUrl}/coffees/${id}`);
	}

	postCoffee(formData: CoffeeModel): Observable<CoffeeModel> {
		return this.client.post<CoffeeModel>(`${this.baseUrl}/coffees`, formData);
	}

	putCoffee(formData: CoffeeModel): Observable<CoffeeModel> {
		const id = formData.id;
		return this.client.put<CoffeeModel>(`${this.baseUrl}/coffees/${id}`, formData);
	}

	getCoffeeByField(field: string, value: string): Observable<CoffeeModel[]> {
		return this.client.get<CoffeeModel[]>(`${this.baseUrl}/coffees/?${field}=${value}`);
	}
}
