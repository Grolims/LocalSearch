import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'profile',
    loadChildren: () => import('../../Layout/Home/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'sale-point-detail',
    loadChildren: () => import('../../Layout/Home/sale-point-detail/sale-point-detail.module').then( m => m.SalePointDetailPageModule)
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
