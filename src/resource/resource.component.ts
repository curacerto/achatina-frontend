import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {NgForOf} from "@angular/common";
import {DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [
    CardModule,
    NgForOf
  ],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css'
})
export class ResourceComponent implements OnInit{
  resources: { name: string, icon: string, quantity: number, price: number }[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.http.get<{
      name: string,
      icon: string,
      quantity: number,
      price: number
    }[]>('/api/resource')
      .subscribe({
        next: data => {
          this.resources = data;
          console.log('Resources:', this.resources);
        },
        error: error => {
          console.error('Error fetching resources:', error);
        }
      });
  }

  getSanitizedUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
