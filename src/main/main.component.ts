import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {HttpClient} from "@angular/common/http";
import {CommonModule, NgForOf} from "@angular/common";
import {forkJoin, map} from 'rxjs';
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    AutoCompleteModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  dinosaurs: { name: string, stat_category_id: number }[] = [];
  priceTableStats: number[] = [];
  priceTableItems: { [key: number]: { range: string, price: string }[] } = {};
  categories: { [key: number]: { name: string, multiplier: number } } = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    let dinosaurObservable = this.http.get<{
      name: string,
      stat_category_id: number
    }[]>('/api/dinosaur').pipe(
      map(data => {
        this.dinosaurs = data;
      })
    );

    let priceTableObservable = this.http.get<{
      id: string,
      stat_range_name: string,
      maximum: string,
      minimum: string,
      stat_count: string,
      minimum_price: string
    }[]>('/api/price-table').pipe(
      map(data => {
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
      })
    );

    let categoryObservable = this.http.get<{
      id: number,
      name: string,
      multiplier: number
    }[]>('/api/stat-category').pipe(
      map(data => {
        data.forEach(item => {
          this.categories[item.id] = {name: item.name, multiplier: item.multiplier};
        });
      })
    );

    forkJoin([dinosaurObservable, priceTableObservable, categoryObservable]).subscribe({
      next: () => {
        console.log('All observables completed');
      },
      error: error => {
        console.error('Error in one of the observables:', error);
      }
    });

  }
}
