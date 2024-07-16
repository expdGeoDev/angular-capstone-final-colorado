import { Component } from '@angular/core';
import {CoffeeModel} from "../model/CoffeeModel";
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [],
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.css'
})
export class CoffeeListComponent {


	list: CoffeeModel[] = [];
	sortOrder = 'asc';
	sortKey = '';

	constructor( private coffeeService: HttpService) {

	}

	async ngOnInit() {

		await this.coffeeService.getAllCoffee().subscribe( coffeList=> this.list=coffeList );

	}



}
