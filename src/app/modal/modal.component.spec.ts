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

	it('should open the modal', () => {
		component.open();
		expect(component['element'].style.display).toBe('block');
		expect(document.body.classList.contains('modal-open')).toBeTrue();
		expect(component.isOpen).toBeTrue();
	});

	it('should close the modal', () => {
		component.close();
		expect(component['element'].style.display).toBe('none');
		expect(document.body.classList.contains('modal-open')).toBeFalse();
		expect(component.isOpen).toBeFalse();
	});

	it('should set up click listener for background click to close', () => {
		spyOn(component, 'close');
		component.ngOnInit();

		const event = new MouseEvent('click', { bubbles: true });
		const targetElement = document.createElement('div');
		targetElement.className = 'modal';
		Object.defineProperty(event, 'target', { value: targetElement, writable: false });

		component['element'].dispatchEvent(event);
		expect(component.close).toHaveBeenCalled();
	});
});
