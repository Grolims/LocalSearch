import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterItemsPage } from './filter-items.page';

const routes: Routes = [
  {
    path: '',
    component: FilterItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterItemsPageRoutingModule {}
