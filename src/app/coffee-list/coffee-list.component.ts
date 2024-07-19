import { Component, OnInit } from '@angular/core';
import { CoffeeModel, RoastType, SizeType } from '../model/CoffeeModel';
import { HttpService } from '../service/http.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
@Component({
	selector: 'app-coffee-list',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		NgxSpinnerComponent,
		ModalComponent,
		NgFor,
	],
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
	coffeeSelected: CoffeeModel = {
		id: 0,
		active: false,
		roaster: '',
		size: SizeType.EIGHT,
		roast: RoastType.BLONDE,
		format: 'bean',
		grind: 0,
		origin: [],
		singleOrigin: false,
		tastingNotes: '',
	};
	roastType: string[];
	isValid = true;

	constructor(
		private coffeeService: HttpService,
		private spinner: NgxSpinnerService,
		protected modal: ModalService
	) {
		this.roastType = Object.values(RoastType);
	}

	ngOnInit() {
		this.spinner.show();
		this.coffeeService.getAllCoffee().subscribe(async (coffeList) => {
			await new Promise((f) => setTimeout(f, 1000));
			this.list = coffeList.filter((coffee) => coffee.active === true);
			this.filteredList = [...this.list];
			this.spinner.hide();
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

	validateSearch(): boolean{
		const validRegex = /^[a-z0-9\s']+$/i;
		return validRegex.test(this.searchText);
	}

	applySearch(): void {
		if (this.validateSearch() || this.searchText == ''){
			this.filterData();
			this.searchData();
			this.sortData();
			this.currentPage = 1;
			this.isValid = true;
		} else {
			this.isValid = false;
		}


	}

	onDelete(coffee: CoffeeModel) {
		coffee.active = false;
		this.coffeeService.putCoffee(coffee).subscribe((response) => {
			console.log(response);
		});
		this.filterData();
		this.searchData();
	}

	toggleModal(coffee: CoffeeModel) {
		this.coffeeSelected = coffee;
		this.modal.open('modal-1');
	}

	clearSearch(): void {
		this.searchText = ''; // Clear the search text
		this.roast = 'all'; // Reset roast filter
		this.filterData(); // Reapply filters
		this.searchData(); // Reapply search
		this.sortData(); // Reapply sorting
		this.currentPage = 1; // Reset to first page
		this.isValid = true; // Reset validation state
	}
}
