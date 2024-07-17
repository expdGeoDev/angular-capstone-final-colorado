import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeEditDeleteComponent } from './coffee-edit-delete.component';

describe('CoffeeEditDeleteComponent', () => {
  let component: CoffeeEditDeleteComponent;
  let fixture: ComponentFixture<CoffeeEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeEditDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeeEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
