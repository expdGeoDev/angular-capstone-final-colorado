import { Component } from '@angular/core';
import {HttpService} from "../service/http.service";
import {CoffeeFormComponent} from "../coffee-form/coffee-form.component";

@Component({
  selector: 'app-coffee-edit-delete',
  standalone: true,
	imports: [
		CoffeeFormComponent
	],
  templateUrl: './coffee-edit-delete.component.html',
  styleUrl: './coffee-edit-delete.component.css'
})

export class CoffeeEditDelete {
}
