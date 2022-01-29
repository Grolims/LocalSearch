import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeModalPageRoutingModule } from './home-modal-routing.module';

import { HomeModalPage } from './home-modal.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SalePointDetailPageModule } from '../sale-point-detail/sale-point-detail.module';
import { ItemDetailPageModule } from '../item-detail/item-detail.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeModalPageRoutingModule,
    LeafletModule,
    Ng2SearchPipeModule,
    SalePointDetailPageModule,
    ItemDetailPageModule,

  ],
  declarations: [HomeModalPage]
})
export class HomeModalPageModule {}
