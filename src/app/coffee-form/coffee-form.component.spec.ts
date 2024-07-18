import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeFormComponent } from './coffee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UIRouterModule } from '@uirouter/angular';

describe('CoffeeFormComponent', () => {
  let component: CoffeeFormComponent;
  let fixture: ComponentFixture<CoffeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot(), UIRouterModule.forRoot(), CoffeeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
