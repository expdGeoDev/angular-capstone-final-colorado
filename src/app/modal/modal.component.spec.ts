import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ElementRef } from '@angular/core';

describe('ModalComponent', () => {
	let component: ModalComponent;
	let fixture: ComponentFixture<ModalComponent>;
	let modalService: jasmine.SpyObj<ModalService>;
	let elementRef: ElementRef;

	beforeEach(async () => {
		const modalService = jasmine.createSpyObj('ModalService', ['add', 'remove']);
		elementRef = new ElementRef(document.getElementById('div'));

		await TestBed.configureTestingModule({
			imports: [ModalComponent],
			providers: [
				{ provide: ModalService, useValue: modalService },
				{ provide: ElementRef, useValue: elementRef },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalComponent);
		component = fixture.componentInstance;
		modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add on init', () => {
		spyOn(document.body, 'appendChild').and.callThrough();
		component.ngOnInit();
		expect(document.body.appendChild).toHaveBeenCalledWith(component['element']);
	});
});
