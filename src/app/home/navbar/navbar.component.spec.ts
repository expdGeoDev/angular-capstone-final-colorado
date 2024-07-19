import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { UIRouterModule } from '@uirouter/angular';

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NavbarComponent, UIRouterModule.forRoot({})],
		}).compileComponents();

		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
