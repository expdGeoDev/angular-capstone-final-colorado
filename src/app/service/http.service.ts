import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoffeeModel} from '../model/CoffeeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	baseUrl = 'http://localhost:8100';

	constructor(private client: HttpClient) {}

	getAllCoffee(): Observable<CoffeeModel[]> {
		return this.client.get<CoffeeModel[]>(`${this.baseUrl}/coffees`);
	}

	getCoffeeById(id: number): Observable<CoffeModel[]> {
		return this.client.get<CoffeeModel[]>(`${this.baseUrl}/coffees/${id}`);
	}

	postCoffee(formData: CoffeeModel): Observable<CoffeeModel> {
		return this.client.post<CoffeeModel[]>(`${this.baseUrl}/coffee`, formData);
	}
}
