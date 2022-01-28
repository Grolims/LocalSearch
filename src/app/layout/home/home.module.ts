import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SalePointDetailPageModule } from './sale-point-detail/sale-point-detail.module';
import { ItemDetailPageModule } from './item-detail/item-detail.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LeafletModule,
    Ng2SearchPipeModule,
    SalePointDetailPageModule,
    ItemDetailPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
