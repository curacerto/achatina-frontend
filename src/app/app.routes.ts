import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../main/main.component';
import {PriceTableComponent} from '../price-table/price-table.component';
import {PriceCategoryComponent} from '../price-category/price-category.component';
import { ResourceComponent } from '../resource/resource.component';

export const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'resource', component: ResourceComponent},
  {path: 'price-table', component: PriceTableComponent},
  {path: 'price-category', component: PriceCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
