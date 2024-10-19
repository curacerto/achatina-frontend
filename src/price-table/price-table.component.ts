import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {HttpClient} from '@angular/common/http';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [
    TableModule,
    NgForOf
  ],
  templateUrl: './price-table.component.html',
  styleUrl: './price-table.component.css'
})
export class PriceTableComponent implements OnInit {
  priceTableStats: number[] = [];
  priceTableItems: { [key: number]: { range: string, price: string }[] } = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<{
      id: string,
      stat_range_name: string,
      maximum: string,
      minimum: string,
      stat_count: string,
      minimum_price: string
    }[]>('/api/price-table')
      .subscribe({
        next: data => {
          const uniqueStats = new Set(data.map(item => +item.stat_count));
          this.priceTableStats = Array.from(uniqueStats);

          const priceTableItems: { [key: number]: { range: string, price: string }[] } = {};

          data.forEach(item => {
            const index = +item.stat_count;
            if (!priceTableItems[index]) {
              priceTableItems[index] = [];
            }
            priceTableItems[index].push({
              range: item.stat_range_name + ' (' + item.minimum + ' - ' + item.maximum + ')',
              price: item.minimum_price
            });
          });

          this.priceTableItems = priceTableItems;
        },
        error: error => {
          console.error('Error fetching price table items:', error);
        }
      });
  }
}
