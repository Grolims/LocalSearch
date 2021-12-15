import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalePointDetailPage } from './sale-point-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SalePointDetailPage
  },
  {
    path: 'item-detail',
    loadChildren: () => import('../../../Layout/Home/SalePointDetail/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalePointDetailPageRoutingModule {}
