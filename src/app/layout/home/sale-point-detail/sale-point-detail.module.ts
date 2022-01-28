import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';



import { SalePointDetailPageRoutingModule } from './sale-point-detail-routing.module';

import { SalePointDetailPage } from './sale-point-detail.page';
import { ItemDetailPageModule } from '../item-detail/item-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalePointDetailPageRoutingModule,
    SwiperModule,
    ItemDetailPageModule
  ],
  declarations: [SalePointDetailPage],

})
export class SalePointDetailPageModule {}
