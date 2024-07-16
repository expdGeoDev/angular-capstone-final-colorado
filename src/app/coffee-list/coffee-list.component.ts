import { Component, OnInit } from '@angular/core';
import { CoffeeModel } from '../model/CoffeeModel';
import { HttpService } from '../service/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-coffee-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './coffee-list.component.html',
	styleUrl: './coffee-list.component.css',
})
export class CoffeeListComponent implements OnInit {
	list: CoffeeModel[] = [];
	sortedData: CoffeeModel[] = [];
	sortOrder = 'asc';
	sortKey: keyof CoffeeModel = 'id';
	roast: string = '';
	limit: number = 25;
	currentPage: number = 1;

	constructor(private coffeeService: HttpService) {}

	ngOnInit() {
		this.coffeeService.getAllCoffee().subscribe((coffeList) => {
			this.list = coffeList;
			this.sortedData = [...this.list];
		});
	}

	calculateNumberOfPage(): number {
		return Math.ceil(this.getFilteredandSortedCoffees().length / this.limit);
	}

	changePage(page: number): void {
		if (page >= 1 && page <= this.calculateNumberOfPage()) {
			this.currentPage = page;
		}
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

	getPaginatedResult(): CoffeeModel[] {
		const start = (this.currentPage - 1) * this.limit;
		const end = this.currentPage * this.limit;

		return this.getFilteredandSortedCoffees().slice(start, end);
	}

	getFilteredandSortedCoffees(): CoffeeModel[] {
		return this.roast === ''
			? this.sortedData.filter((coffee) => coffee.active === true)
			: this.sortedData
					.filter((coffee) => coffee.active === true)
					.filter((coffee) => coffee.roast === this.roast);
	}
}
