import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PriceTableComponent} from "../price-table/price-table.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PriceTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'achatina-frontend';
}
