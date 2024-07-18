import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeListComponent } from './coffee-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CoffeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
