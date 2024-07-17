import { Component, OnInit } from '@angular/core';
import { CoffeeModel } from '../model/CoffeeModel';
import { HttpService } from '../service/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-coffee-list',
	standalone: true,
	imports: [CommonModule, FormsModule, NgxPaginationModule],
	templateUrl: './coffee-list.component.html',
	styleUrl: './coffee-list.component.css',
})
export class CoffeeListComponent implements OnInit {
	list: CoffeeModel[] = [];
	filteredList: CoffeeModel[] = [];
	sortOrder = 'asc';
	sortKey: keyof CoffeeModel = 'id';
	roast: string = 'all';
	limit: number = 10;
	currentPage: number = 1;
	searchText: string = '';

	constructor(
		private coffeeService: HttpService,
		private spinner: NgxSpinnerService
	) {}

	ngOnInit() {
		// TODO: NGXSpinner is showing but not creating cool spinner
		// To Test we are having to comment out 'this.spinner.hide()'
		this.spinner.show();
		this.coffeeService.getAllCoffee().subscribe((coffeList) => {
			this.list = coffeList.filter((coffee) => coffee.active === true);
			this.filteredList = [...this.list];
		});
		this.spinner.hide();
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
		this.sortData();
	}

	sortData() {
		this.filteredList.sort((a, b) => {
			const aValue = this.sortKey === 'id' ? +a[this.sortKey] : a[this.sortKey];
			const bValue = this.sortKey === 'id' ? +b[this.sortKey] : b[this.sortKey];

			if (aValue === undefined || bValue === undefined) {
				return 0; // Treat undefined values as equal
			}

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
		return this.filteredList;
	}

	filterData(): void {
		if (this.roast === 'all') {
			this.filteredList = this.list.filter((coffee) => coffee.active === true);
		} else {
			this.filteredList = this.list
				.filter((coffee) => coffee.active === true)
				.filter((coffee) => coffee.roast === this.roast);
		}
	}

	searchData(): void {
		const searchValue = this.searchText.toLowerCase().trim();
		this.filteredList = this.filteredList.filter((coffee) => {
			return coffee.roaster.toLowerCase().includes(searchValue);
		});
	}

	applySearch(): void {
		this.filterData();
		this.searchData();
		this.sortData();
		this.currentPage = 1;
	}

	onDelete(coffee: CoffeeModel) {
		coffee.active = false;
		this.coffeeService.putCoffee(coffee).subscribe((response) => {
			console.log(response);
		});
		this.filterData();
		this.searchData();
	}
}
