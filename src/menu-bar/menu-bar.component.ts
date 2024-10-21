import {Component, Input} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    MenubarModule
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  items = [
    {label: 'Dinosaurs', icon: 'pi pi-fw pi-box', routerLink: '/main'},
    {label: 'Pricing Rules', icon: 'pi pi-fw pi-dollar', routerLink: '/price-table'},
    {label: 'Pricing Categories', icon: 'pi pi-fw pi-book', routerLink: '/price-category'}
  ];
}