import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeModalPageRoutingModule } from './home-modal-routing.module';

import { HomeModalPage } from './home-modal.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SalePointDetailPageModule } from 'src/app/Layout/Home/sale-point-detail/sale-point-detail.module';
import { ItemDetailPageModule } from 'src/app/Layout/home/item-detail/item-detail.module';
import { ProfilePageModule } from 'src/app/layout/home/profile/profile.module';


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
    ProfilePageModule

  ],
  declarations: [HomeModalPage]
})
export class HomeModalPageModule {}
