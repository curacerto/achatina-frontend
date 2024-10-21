import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {HttpClient} from "@angular/common/http";
import {MenuBarComponent} from "../menu-bar/menu-bar.component";

@Component({
  selector: 'app-price-category',
  standalone: true,
  imports: [
    TableModule,
    MenuBarComponent
  ],
  templateUrl: './price-category.component.html',
  styleUrl: './price-category.component.css'
})
export class PriceCategoryComponent implements OnInit {
  categories: { name: string, multiplier: string }[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<{
      name: string,
      multiplier: string
    }[]>('/api/stat-category')
      .subscribe({
        next: data => {
          this.categories = data;
        },
        error: error => {
          console.error('Error fetching price categories:', error);
        }
      });

  }
}
