import { Component, OnInit } from '@angular/core';
import {CoffeeModel} from "../model/CoffeeModel";
import {HttpService} from "../service/http.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.css'
})
export class CoffeeListComponent implements OnInit{



	list: CoffeeModel[] = [];
	sortedData: CoffeeModel[] =[];
	sortOrder = 'asc';
	sortKey: keyof CoffeeModel = 'id';
	constructor( private coffeeService: HttpService) {
	}

	ngOnInit() {

		  this.coffeeService.getAllCoffee().subscribe( coffeList=> {this.list=coffeList;
			this.sortedData = [...this.list];
			});

	}
	sortTable(key: keyof CoffeeModel) {
		this.sortKey = key;
		this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

		this.sortedData = this.list.sort((a, b) => {
			const aValue = key === 'id' ? +a[key] : a[key];
			const bValue = key === 'id' ? +b[key] : b[key];

			if (aValue === undefined || bValue === undefined) {
				return 0; // Treat undefined values as equal
			}

			// if (this.sortedKey == 'id'){
			//
			// }

			if (aValue < bValue) {
				return this.sortOrder === 'asc' ? -1 : 1;
			} else if (aValue > bValue) {
				return this.sortOrder === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});
	}

	getSortClass(key: keyof CoffeeModel): string {
		if (this.sortKey !== key) {
			return '';
		}
		return this.sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
	}


}
